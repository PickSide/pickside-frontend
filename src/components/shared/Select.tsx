import { ReactNode, forwardRef, useId } from 'react'
import ReactSelect, {
	ClearIndicatorProps,
	DropdownIndicatorProps,
	MultiValueRemoveProps,
	Props,
	components,
} from 'react-select'
import { VariantProps, cva } from 'class-variance-authority'

import Icon from './Icon'
import IconButton from '@components/IconButton'
import { cn } from '@utils'

export const SelectVariants = cva('w-full inline-flex items-center mt-1',
	{
		variants: {
			size: {
				sm: ['h-8'],
				md: ['h-9'],
				lg: ['h-10'],
			},
		},
		defaultVariants: {
			size: 'sm',
		},
	},
)

export interface SelectProps extends Props<any>, VariantProps<typeof SelectVariants> {
	startContent?: ReactNode
	error?: any
	label?: string
	fullWidth?: boolean
}

const DropdownIndicator = (props: DropdownIndicatorProps) => (
	<components.DropdownIndicator {...props}>
		<Icon icon="keyboard_arrow_down" size='sm' />
	</components.DropdownIndicator>
)

const ClearIndicator = (props: ClearIndicatorProps) => (
	<components.ClearIndicator {...props}>
		<IconButton size="sm">
			<Icon icon="close" size='sm' />
		</IconButton>
	</components.ClearIndicator>
)

const MultiValueRemove = (props: MultiValueRemoveProps) => (
	<components.MultiValueRemove {...props}>
		<Icon icon="close" size="sm" />
	</components.MultiValueRemove>
)

const controlStyles = {
	base: 'border rounded-md hover:cursor-pointer',
	focus: 'border-ocean ring-1 ring-ocean-500',
	nonFocus: 'border-gray-300 hover:border-gray-400',
}
const placeholderStyles = 'text-gray-400 pl-2'
const selectInputStyles = 'leading-8'
const valueContainerStyles = 'pl-4'
const singleValueStyles = ''
const multiValueStyles = 'bg-ocean text-white rounded-md items-center py px-2 gap-1.5 mr-2'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles = 'text-white'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md'
const dropdownIndicatorStyles = 'p-1 hover:bg-gray-100 text-gray-500'
const menuStyles = 'border border-gray-200 rounded-lg'
const menuList = 'bg-white'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm'
const optionStyles = {
	base: 'hover:cursor-pointer p-2 rounded',
	focus: 'bg-gray-100 active:bg-gray-200',
	disabled: 'text-gray-300',
	selected: "bg-gray-100 text-success font-semibold",
}
const noOptionsMessageStyles = 'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm bg-white'

const Select = forwardRef<any, SelectProps>(({ className, components, label, fullWidth = false, ...rest }: SelectProps, ref) => {
	const id = useId()

	return (
		<div className={cn('relative ', fullWidth ? 'w-full' : '')} ref={ref}>
			<label id={`listbox-label-${id}`} className='min-h-[24px]'>
				{label}
			</label>
			<ReactSelect
				inputId={`listbox-label-${id}`}
				components={{ DropdownIndicator, ClearIndicator, MultiValueRemove, ...components }}
				unstyled
				classNamePrefix="pickside-select"
				classNames={{
					control: ({ isFocused }) => cn(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
					input: () => selectInputStyles,
					placeholder: () => placeholderStyles,
					valueContainer: () => valueContainerStyles,
					singleValue: () => singleValueStyles,
					multiValue: () => multiValueStyles,
					multiValueLabel: () => multiValueLabelStyles,
					multiValueRemove: () => multiValueRemoveStyles,
					indicatorsContainer: () => indicatorsContainerStyles,
					clearIndicator: () => clearIndicatorStyles,
					dropdownIndicator: () => dropdownIndicatorStyles,
					menuList: () => menuList,
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
