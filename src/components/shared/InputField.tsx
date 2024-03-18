import { ComponentPropsWithRef, ReactNode, forwardRef, useCallback, useId, useState } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const inputVariants = cva(
	[
		'inline-flex bg-white items-center border-2 rounded-md h-full mt-1 mb-2 focus-within:border-2 focus-within:border-ocean transition-all',
	],
	{
		variants: {
			variant: {},
			size: {
				sm: ['h-10'],
				md: ['h-12'],
				lg: ['h-14'],
			},
		},
		defaultVariants: {
			size: 'sm',
		},
	},
)

export type InputFieldProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & VariantProps<typeof inputVariants> & {
	label?: string | ReactNode
	startContent?: ReactNode
	endContent?: ReactNode
	readOnly?: boolean
	onPressArrowDown?: (e?: any) => void
	onPressArrowUp?: (e?: any) => void
	onPressEnterKey?: (e?: any) => void
	error?: any
	fullWidth?: boolean
	defaultValue?: string | number
}

const InputField = forwardRef<any, InputFieldProps>(
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
			error,
			readOnly = false,
			fullWidth = false,
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
			<div className="flex flex-col" ref={ref}>
				<label htmlFor={`${id || generatedId}-label-input`}>
					{label}
				</label>
				<div className={cn(inputVariants({ className, size }), className)}>
					<span className="inline-flex items-center max-w-6 max-h-6 mx-2">{startContent}</span>
					<input
						ref={ref}
						aria-labelledby={`${id || generatedId}-label-input`}
						autoComplete="off"
						disabled={readOnly}
						placeholder={placeholder}
						onKeyDown={onKeyDown}
						className="rounded-md h-full w-full focus-visible:outline-none disabled:bg-white disabled:cursor-not-allowed text-gray-800 disabled:text-gray-300"
						{...rest}
					/>
					<span className="inline-flex items-center w-6 h-6 mx-2">{endContent}</span>
				</div>
				{error && (
					<label htmlFor={id} className="text-error">
						{error}
					</label>
				)}
			</div>
		)
	},
)
export default InputField
