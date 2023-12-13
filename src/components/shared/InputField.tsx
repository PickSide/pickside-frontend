import { ComponentPropsWithRef, ReactNode, forwardRef, useCallback, useId } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const inputVariants = cva(
	[
		'inline-flex bg-white items-center border-2 rounded-md h-full mt-1 mb-2 focus-within:border-2 focus-within:border-primary transition-all',
	],
	{
		variants: {
			variant: {},
			size: {
				sm: ['h-9'],
				md: ['h-10'],
				lg: ['h-12'],
			},
		},
		defaultVariants: {
			size: 'sm',
		},
	},
)

interface InputFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'>, VariantProps<typeof inputVariants> {
	label?: string
	startContent?: ReactNode
	endContent?: ReactNode
	readOnly?: boolean
	onPressArrowDown?: (e?: any) => void
	onPressArrowUp?: (e?: any) => void
	onPressEnterKey?: (e?: any) => void
	error?: any
	fullWidth?: boolean
	defaultValue?: string
}

const InputField = forwardRef<ComponentPropsWithRef<'input'>, InputFieldProps>(
	(
		{
			id,
			className,
			label,
			startContent,
			endContent,
			onPressArrowDown,
			onPressArrowUp,
			onPressEnterKey,
			placeholder,
			pattern,
			error,
			defaultValue,
			readOnly = false,
			fullWidth = false,
			value,
			size,
			...rest
		},
		ref,
	) => {
		const generatedId = useId()
		const onKeyDown = useCallback(
			(e) => {
				if (e.key === 'ArrowDown') {
					onPressArrowDown && onPressArrowDown()
				} else if (e.key === 'ArrowUp') {
					onPressArrowUp && onPressArrowUp()
				} else if (e.key === 'Enter') {
					onPressEnterKey && onPressEnterKey()
				}
				return
			},
			[onPressEnterKey, onPressArrowDown, onPressArrowUp],
		)

		return (
			<div className="w-full flex flex-col">
				<label htmlFor={`${id || generatedId}-label-input`} className="text-gray-800">
					{label}
				</label>
				<div className={cn(inputVariants({ className, size }), className)}>
					<span className="inline-flex items-center max-w-6 max-h-6 mx-2">{startContent}</span>

					<input
						aria-labelledby={`${id || generatedId}-label-input`}
						autoComplete="off"
						disabled={readOnly}
						value={value}
						placeholder={placeholder}
						onKeyDown={onKeyDown}
						className="rounded-md h-full w-full focus-visible:outline-none disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
						{...rest}
					/>
					<span className="inline-flex items-center w-6 h-6 mx-2">{endContent}</span>
					{!error && (
						<label htmlFor={id}>
							<span className="text-error">{error}</span>
						</label>
					)}
				</div>
			</div>
		)
	},
)
export default InputField
