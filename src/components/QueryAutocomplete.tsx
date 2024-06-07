import { ComponentPropsWithRef, ReactElement, Ref, cloneElement, useEffect, useId, useRef, useState } from 'react'

import { AxiosInstance } from 'axios'
import Icon from './shared/Icon'
import IconButton from './IconButton'
import Spinner from './Spinner'
import { dropdownAnimation } from '@utils'
import { motion } from 'framer-motion'
import { useDebounce } from 'usehooks-ts'
import { useQuery } from '@tanstack/react-query'

export interface QueryAutocompleteProps<T> extends ComponentPropsWithRef<'input'> {
	apiContext: AxiosInstance
	endpoint: string
	clearable?: boolean
	fullWidth?: boolean
	getOptionLabel: (o) => string
	getOptionValue?: (o) => string
	groupBy?: (o) => string
	label?: string
	loading?: boolean
	loadingText?: string
	noOptionText?: string
	onChange?: (e?) => any
	options?: T[]
	renderInput?: (o) => ReactElement<any>
}

const QueryAutocomplete = <T,>({
	apiContext,
	endpoint,
	clearable = false,
	fullWidth = false,
	getOptionLabel,
	getOptionValue,
	groupBy,
	label,
	loadingText,
	noOptionText,
	onChange,
	renderInput,
	...rest
}: QueryAutocompleteProps<T> & { myRef?: Ref<HTMLInputElement> }) => {
	const id = useId()
	const ref = useRef<HTMLInputElement>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [selected, setSelected] = useState<T>()
	const [userInput, setMeInput] = useState<string>('')
	const debouncedOpen = useDebounce(open, 100)
	const searchText = useDebounce(userInput, 500)

	const { data: options, isLoading } = useQuery<T[]>(
		['search-users', searchText],
		async () => {
			if (!userInput) {
				return []
			}

			const response = await apiContext.get(endpoint, { params: { startsWith: userInput } })
			return (response.data.result as T[]) || []
		},
		{ refetchOnWindowFocus: false },
	)

	const handleOnChange = (e) => setMeInput(e.target.value)

	const handleSelected = (option: T) => {
		setSelected(option)
		handleClose()
	}

	const handleOpen = () => {
		setOpen(true)
		ref.current?.focus()
	}

	const handleClose = () => {
		setOpen(false)
		ref.current?.blur()
	}

	const handleClear = () => {
		setMeInput('')
		setSelected(undefined)
	}

	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Escape':
					setOpen(false)
					break
				default:
					return setOpen(true)
			}
		}

		document.getElementById(id)?.addEventListener('keydown', handleKeydown)
		document.getElementById(id)?.addEventListener('focusin', handleOpen)
		document.getElementById(id)?.addEventListener('focusout', handleClose)

		return (): void => {
			document.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('focusin', handleOpen)
			document.removeEventListener('focusout', handleClose)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (selected && onChange) {
			setMeInput(getOptionLabel(selected))
			onChange(selected)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected])

	return (
		<div className="relative inline-flex items-centers w-full">
			<label htmlFor={id}>
				<span className="text-gray-400">{label}</span>
			</label>
			<div className="p-1 inline-flex items-center rounded-md bg-white border-gray-200 border-2 focus-within:border-[1px] focus-within:border-ocean w-full">
				<Icon className="mx-2" icon="search" />
				<div className="flex-grow-2 inline-flex justify-between px-1 py-0.5 rounded-md">
					<input
						ref={ref}
						tabIndex={1}
						className="focus-visible:outline-none"
						id={id}
						autoComplete="on"
						type="text"
						value={userInput}
						onChange={handleOnChange}
						{...rest}
					/>
					{clearable && selected && (
						<IconButton onClick={handleClear} size="sm">
							<Icon icon="close" size="sm" />
						</IconButton>
					)}
				</div>
				{debouncedOpen ? (
					<IconButton onClick={handleClose}>
						<Icon icon="keyboard_arrow_up" />
					</IconButton>
				) : (
					<IconButton onClick={handleOpen}>
						<Icon icon="keyboard_arrow_down" />
					</IconButton>
				)}
			</div>

			{debouncedOpen && (
				<>
					<div className="fixed inset-0 bg-none w-screen h-screen" />
					<motion.div
						initial="closed"
						animate="open"
						exit="exit"
						variants={dropdownAnimation}
						className="absolute top-full rounded-b w-full origin-top-left bg-white mt-1 shadow-lg overflow-y z-10"
					>
						{isLoading ? (
							<div className="w-full flex justify-center p-2">
								<Spinner text={loadingText} />
							</div>
						) : !options?.length ? (
							<div className="w-full flex justify-center p-2">
								<span className="text-base text-gray-400">{noOptionText}</span>
							</div>
						) : renderInput ? (
							options?.map((option, idx) =>
								cloneElement(renderInput(option), { key: idx, onClick: () => handleSelected(option) }),
							)
						) : (
							options?.map((option, idx) => (
								<div
									onClick={() => handleSelected(option)}
									key={idx}
									className="w-full px-4 py-3 hover:bg-ocean hover:text-white"
								>
									<span className="font-semibold py-2 px-6">{getOptionLabel && getOptionLabel(option)}</span>
								</div>
							))
						)}
					</motion.div>
				</>
			)}
		</div>
	)
}

export default QueryAutocomplete
