import { ComponentPropsWithRef, ReactElement, useState } from 'react'
import { Select } from '@components'
import { useDebounce } from 'usehooks-ts'
import { useQuery } from '@tanstack/react-query'

export interface QueryAutocompleteV2Props<T> extends ComponentPropsWithRef<'input'> {
	queryFn: (searchText: string) => Promise<T[]>
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
	customStyles?: any
}

const QueryAutocompleteV2 = <T,>({
	queryFn,
	clearable = false,
	fullWidth = false,
	getOptionLabel,
	getOptionValue,
	label,
	loadingText,
	noOptionText,
	onChange,
	renderInput,
	customStyles = {},
	...rest
}: QueryAutocompleteV2Props<T>) => {
	const [selected, setSelected] = useState<T>()
	const [input, setInput] = useState<string>('')
	const searchText = useDebounce(input, 500)

	const { data: options, isLoading } = useQuery<T[]>(
		['search', searchText],
		async () => {
			if (!input || selected) {
				return []
			}
			return await queryFn(input)
		},
		{ refetchOnWindowFocus: false },
	)

	const handleInputChange = (newValue: string) => {
		setInput(newValue)
		setSelected(undefined)
	}

	const handleChange = (option: T | null) => {
		if (option) {
			setSelected(option)
			setInput(getOptionLabel(option))
			if (onChange) onChange(option)
		}
	}

	const defaultStyles = {
		control: (provided) => ({
			...provided,
			width: fullWidth ? '100%' : undefined,
		}),
	}

	const combinedStyles = {
		...defaultStyles,
		...customStyles,
	}

	return (
		<Select
			// {...rest}
			styles={combinedStyles}
			isClearable={clearable}
			isLoading={isLoading}
			options={options}
			getOptionLabel={getOptionLabel}
			getOptionValue={getOptionValue}
			onInputChange={handleInputChange}
			onChange={handleChange}
			noOptionsMessage={() => noOptionText}
			placeholder={loadingText}
		/>
	)
}

export default QueryAutocompleteV2
