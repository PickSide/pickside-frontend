import { FC, useCallback, useId, useMemo, useState } from 'react'

import { BiSearch } from 'react-icons/bi'
import Spinner from './Spinner'
import _groupBy from 'lodash/groupBy'
import { dropdownAnimation } from '@utils'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface AutocompleteProps<T> {
	placeholder?: string
	options?: any[T]
	loading?: boolean
	fullWidth?: boolean
	label?: string
	onChange?: (v) => void
	getOptionLabel?: (o) => string
	groupBy?: (o) => string
}

const KEYS_BINDS = {
	27: 'close',
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
}

const Autocomplete: FC<AutocompleteProps<any>> = ({
	placeholder,
	loading = false,
	fullWidth = false,
	label,
	getOptionLabel,
	groupBy,
	options,
	onChange,
	...props
}) => {
	const id = useId()
	const { t } = useTranslation()
	const [query, setQuery] = useState<any>()
	const [value, setValue] = useState<string>('')
	const [focus, setFocus] = useState<boolean>(false)

	const filteredOptions = useMemo(() => {
		return options?.filter((option) => {
			return (
				getOptionLabel &&
				getOptionLabel(option)
					.toLowerCase()
					.indexOf((query || '').toLowerCase()) > -1
			)
		})
	}, [getOptionLabel, options, query])

	const showOptions = useMemo(() => focus, [focus])

	const onKeyDown = useCallback((e: any) => {
		if (KEYS_BINDS[e.keyCode] === 'close') {
			setFocus(false)
			return
		}
	}, [])

	const onInputChange = useCallback((e) => {
		setQuery(e.target.value)
		setValue(e.target.value)
	}, [])

	const onSelect = useCallback(
		(option) => {
			if (getOptionLabel) {
				setValue(getOptionLabel(option))
				onChange && onChange(option)
			}
		},
		[getOptionLabel, onChange],
	)

	const onFocus = () => setFocus(true)
	const onBlur = () => setFocus(false)

	const groupedOptions = _groupBy(filteredOptions, groupBy) || {}

	const GroupedOptions = () => {
		return (
			<>
				{Object.entries(groupedOptions).map(([group, values], idx) => (
					<div key={idx} className="flex flex-col w-full rounded-md">
						<span className="w-full font-normal text-[20px] px-4 py-1">{group}</span>
						{Array.isArray(values) &&
							values.map((option, idx) => (
								<div
									key={idx}
									className="w-full cursor-pointer py-2 hover:bg-slate-50 "
									onMouseDown={() => onSelect(option)}
								>
									<span className="font-normal py-2 px-6">{getOptionLabel && getOptionLabel(option)}</span>
								</div>
							))}
					</div>
				))}
			</>
		)
	}

	const OptionsList = () => (
		<>
			{filteredOptions?.map((option, idx) => (
				<div
					className="w-full px-4 py-3 hover:bg-[#47c2ed] hover:text-[#e0f2f1] rounded-md"
					onMouseDown={() => onSelect(option)}
				>
					<span className="font-semibold py-2 px-6">{getOptionLabel && getOptionLabel(option)}</span>
				</div>
			))}
		</>
	)

	const RenderList = () => {
		if ((!options || !filteredOptions) && !loading) {
			return (
				<div className="min-h-[30px] px-4 py-2">
					<span className="font-normal opacity-50 text-[15px] italic">{t('No options')}</span>
				</div>
			)
		}
		if (!options && loading) {
			return (
				<div className="min-h-[30px] px-4 py-2 text-center">
					<Spinner />
				</div>
			)
		}
		if (!!groupBy && !loading) {
			return <GroupedOptions />
		}
		return <OptionsList />
	}

	return (
		<div className={`${!fullWidth ? 'min-w-[400px]' : ''} relative flex flex-col text-gray-400`}>
			<label htmlFor={id} className="">
				<span className="text-gray-400">{label}</span>
			</label>
			<div className="relative inline-flex w-full items-center rounded-md h-[50px] pr-[40px] bg-white border-gray-200 border-2 focus-within:border-2 focus-within:border-primary">
				<input
					tabIndex={1}
					className="relative rounded-md px-4 py-2 focus-visible:outline-none"
					id={id}
					autoComplete="on"
					type="text"
					value={value}
					placeholder={placeholder}
					onFocus={onFocus}
					onBlur={onBlur}
					onKeyDown={onKeyDown}
					onChange={onInputChange}
					{...props}
				/>
				<span className="absolute right-[8px] text-gray-300 btn-icon m-auto">
					<BiSearch size={20} />
				</span>
				{/* <button
					type="button"
					onClick={() => setFocus(!showOptions)}
					className="absolute right-[8px] text-gray-500 btn-icon cursor-pointer m-auto"
				>
					{showOptions ? (
						<MdArrowDropUp className="hover:bg-gray-200" size={25} />
					) : (
						<MdArrowDropDown className="hover:bg-gray-200" size={25} />
					)}
				</button> */}
			</div>

			{showOptions && (
				<motion.div
					initial="closed"
					animate="open"
					exit="exit"
					variants={dropdownAnimation}
					className="absolute top-[50px] rounded-b w-full origin-top-left bg-white mt-1 shadow-lg max-h-[500px] overflow-y-auto"
				>
					<RenderList />
				</motion.div>
			)}
		</div>
	)
}

export default Autocomplete
