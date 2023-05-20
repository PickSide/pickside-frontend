import { FC, useCallback, useMemo, useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import Spinner from './Spinner'
import _groupBy from 'lodash/groupBy'

interface AutocompleteProps<T> {
	placeholder?: string
	options?: any[T]
	loading?: boolean
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
	loading,
	getOptionLabel,
	groupBy,
	options,
	onChange,
	...props
}) => {
	const { t } = useTranslation()
	const [query, setQuery] = useState<any>()
	const [value, setValue] = useState<string>('')
	const [onFocus, setOnFocus] = useState<boolean>(false)

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

	const showOptions = useMemo(() => onFocus, [onFocus])

	const _onKeyDown = useCallback((e: any) => {
		if (KEYS_BINDS[e.keyCode] === 'close') {
			setOnFocus(false)
			return
		}
	}, [])

	const _onInputChange = useCallback((e) => {
		setQuery(e.target.value)
		setValue(e.target.value)
	}, [])

	const _onSelect = useCallback(
		(option) => {
			if (getOptionLabel) {
				setValue(getOptionLabel(option))
				onChange && onChange(option)
			}
		},
		[getOptionLabel, onChange],
	)

	const _onFocus = () => setOnFocus(true)

	const _onBlur = () => setOnFocus(false)

	const groupedOptions = _groupBy(filteredOptions, groupBy) || {}

	const GroupedOptions = () => {
		return (
			<>
				{Object.entries(groupedOptions).map(([group, values], idx) => (
					<div key={idx} className="flex flex-col w-full rounded-md">
						<span className="w-full font-normal text-[20px] px-4 py-1 ">{group}</span>
						{Array.isArray(values) &&
							values.map((option, idx) => (
								<div
									key={idx}
									className="w-full cursor-pointer py-2 hover:bg-slate-50 "
									onMouseDown={() => _onSelect(option)}
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
					onMouseDown={() => _onSelect(option)}
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
		<div className="relative flex flex-col w-fit">
			<div className="relative min-w-[300px] pl-2 pr-[40px] py-2 rounded-md h-[50px] bg-white outline-slate-800 focus-within:border-2 focus-within:border-none">
				<input
					className="relative rounded-md w-[90%] h-full px-2 py-2 focus:border-primary outline-0 focus:outline-0"
					id="autocomplete"
					type="text"
					value={value}
					placeholder={placeholder}
					onFocus={_onFocus}
					onBlur={_onBlur}
					onKeyDown={_onKeyDown}
					onChange={_onInputChange}
					autoComplete="off"
					{...props}
				/>
				<label htmlFor="autocomplete" className="absolute rounder right-2 top-3 hover:bg-slate-100 cursor-pointer">
					<span className="text-[#82cac3]">
						{showOptions ? <MdArrowDropUp size={25} /> : <MdArrowDropDown size={25} />}
					</span>
				</label>
			</div>

			<AnimatePresence initial={false} mode="wait">
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
			</AnimatePresence>
		</div>
	)
}

export default Autocomplete
