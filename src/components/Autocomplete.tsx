import { ComponentPropsWithRef, ReactElement, Ref, cloneElement, useEffect, useId, useRef, useState } from 'react'

import Icon from './shared/Icon'
import IconButton from './IconButton'
import Spinner from './Spinner'
import { dropdownAnimation } from '@utils'
import { motion } from 'framer-motion'
import { useDebounce } from 'usehooks-ts'

export interface AutocompleteProps<T> extends ComponentPropsWithRef<'input'> {
	clearable?: boolean
	fullWidth?: boolean
	getOptionLabel?: (o) => string
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

const Autocomplete = <T,>({
	clearable = false,
	fullWidth = false,
	getOptionLabel,
	getOptionValue,
	groupBy,
	label,
	loading = false,
	loadingText,
	noOptionText,
	onChange,
	options = [],
	renderInput,
	...rest
}: AutocompleteProps<T> & { myRef?: Ref<HTMLInputElement> }) => {
	const id = useId()
	const ref = useRef<HTMLInputElement>(null)
	const [open, setOpen] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')
	const debouncedOpen = useDebounce(open, 100)

	const onSelectElement = (e, option: T) => {
		if (getOptionLabel) {
			setValue(getOptionLabel(option))
		}
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
		setValue('')
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

		document.addEventListener('keydown', handleKeydown)
		document.addEventListener('focusin', handleOpen)
		document.addEventListener('focusout', handleClose)

		return (): void => {
			document.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('focusin', handleOpen)
			document.removeEventListener('focusout', handleClose)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const LoadingEl = () => (
		<div className="w-full flex justify-center p-2">
			<Spinner text={loadingText} />
		</div>
	)
	const RenderList = () => {
		if (!options.length) {
			return (
				<div className="w-full flex justify-center p-2">
					<span className="text-base text-gray-400">{noOptionText}</span>
				</div>
			)
		} else if (renderInput) {
			return options?.map((option, idx) =>
				cloneElement(renderInput(option), { key: idx, onClick: (e) => onSelectElement(e, option) }),
			)
		} else {
			return (
				<>
					{options?.map((option, idx) => (
						<div
							onClick={(e) => onSelectElement(e, option)}
							key={idx}
							className="w-full px-4 py-3 hover:bg-ocean hover:text-white"
						>
							<span className="font-semibold py-2 px-6">{getOptionLabel && getOptionLabel(option)}</span>
						</div>
					))}
				</>
			)
		}
	}

	return (
		<div className={`${!fullWidth ? 'min-w-[400px]' : ''} relative flex flex-col`}>
			<label htmlFor={id} className="">
				<span className="text-gray-400">{label}</span>
			</label>
			<div className="p-1 inline-flex items-center rounded-md bg-white border-gray-200 border-2 focus-within:border-[1px] focus-within:border-ocean">
				<Icon className="mx-2" icon="search" />
				<div className="flex-grow-2 inline-flex px-1 py-0.5 rounded-md">
					<input
						ref={ref}
						tabIndex={1}
						className="w-full focus-visible:outline-none"
						id={id}
						autoComplete="on"
						type="text"
						value={value}
						{...rest}
					/>
					{clearable && !!value && (
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

			{!debouncedOpen && (
				<motion.div
					initial="closed"
					animate="open"
					exit="exit"
					variants={dropdownAnimation}
					className="absolute top-full rounded-b w-full origin-top-left bg-white mt-1 shadow-lg max-h-[500px] overflow-y"
				>
					{loading ? <LoadingEl /> : <RenderList />}
				</motion.div>
			)}
		</div>
	)
}

export default Autocomplete
