import { ReactNode, forwardRef } from 'react'
import ReactSelect, {
	ClearIndicatorProps,
	DropdownIndicatorProps,
	MultiValueRemoveProps,
	Props,
	components,
} from 'react-select'

import Icon from './Icon'
import IconButton from '../IconButton'
import { cn } from '@utils'

interface SelectProps extends Props {
	startContent?: ReactNode
	error?: any
	label?: string
	fullWidth?: boolean
}

const DropdownIndicator = (props: DropdownIndicatorProps) => (
	<components.DropdownIndicator {...props}>
		<Icon icon="keyboard_arrow_down" />
	</components.DropdownIndicator>
)

const ClearIndicator = (props: ClearIndicatorProps) => (
	<components.ClearIndicator {...props}>
		<Icon icon="close" />
	</components.ClearIndicator>
)

const MultiValueRemove = (props: MultiValueRemoveProps) => (
	<components.MultiValueRemove {...props}>
		<IconButton variant="secondary" size="sm">
			<Icon icon="close" size="sm" />
		</IconButton>
	</components.MultiValueRemove>
)

const controlStyles = {
	base: 'border rounded-md bg-white hover:cursor-pointer h-fit',
	focus: 'border-primary ring-1 ring-primary-500',
	nonFocus: 'border-gray-300 hover:border-gray-400',
}
const placeholderStyles = 'text-gray-400 pl-2'
const selectInputStyles = 'leading-8'
const valueContainerStyles = 'pl-4'
const singleValueStyles = ''
const menuPortal = 'z-50'
const multiValueStyles = 'bg-primary text-white rounded-md items-center py px-2 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles = 'text-white'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md'
const dropdownIndicatorStyles = 'p-1 hover:bg-gray-100 text-gray-500'
const menuStyles = 'border border-gray-200 bg-white rounded-lg'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm'
const optionStyles = {
	base: 'hover:cursor-pointer p-2 rounded',
	focus: 'bg-gray-100 active:bg-gray-200',
	disabled: 'text-gray-300',
	selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
}
const noOptionsMessageStyles = 'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm'

const Select = forwardRef(({ components, label, fullWidth = false, ...rest }: SelectProps | any, ref) => {
	return (
		<div className={cn('relative min-w-[200px]', fullWidth ? 'w-full' : '')}>
			<label id="listbox-label" className="text-gray-800 leading-4">
				{label}
			</label>
			<ReactSelect
				components={{ DropdownIndicator, ClearIndicator, MultiValueRemove, ...components }}
				unstyled
				classNames={{
					control: ({ isFocused }) => cn(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
					input: () => selectInputStyles,
					placeholder: () => placeholderStyles,
					valueContainer: () => valueContainerStyles,
					singleValue: () => singleValueStyles,
					menuPortal: () => menuPortal,
					multiValue: () => multiValueStyles,
					multiValueLabel: () => multiValueLabelStyles,
					multiValueRemove: () => multiValueRemoveStyles,
					indicatorsContainer: () => indicatorsContainerStyles,
					clearIndicator: () => clearIndicatorStyles,
					dropdownIndicator: () => dropdownIndicatorStyles,
					menu: () => menuStyles,
					groupHeading: () => groupHeadingStyles,
					option: ({ isFocused, isDisabled, isSelected }) =>
						cn(
							isDisabled && optionStyles.disabled,
							isFocused && optionStyles.focus,
							isSelected && optionStyles.selected,
							optionStyles.base,
						),
					noOptionsMessage: () => noOptionsMessageStyles,
				}}
				{...rest}
				ref={ref}
			/>
		</div>
	)
})

export default Select
