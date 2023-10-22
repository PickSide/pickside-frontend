import { ComponentPropsWithRef, HTMLInputTypeAttribute, ReactNode, forwardRef, useCallback } from 'react'

import { cn } from '@utils'

export interface InputFieldProps extends ComponentPropsWithRef<'input'> {
	id?: string
	label?: string
	startContent?: ReactNode
	endContent?: ReactNode
	readOnly?: boolean
	onPressArrowDown?: (e?: any) => void
	onPressArrowUp?: (e?: any) => void
	onPressEnterKey?: (e?: any) => void
	error?: any
	type?: HTMLInputTypeAttribute
	fullWidth?: boolean
	defaultValue?: string
	value?: any
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
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
			...rest
		},
		ref,
	) => {
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
			<div className={cn('relative flex flex-col disabled:text-gray-400', !fullWidth ? 'max-w-[230px]' : '')}>
				<label htmlFor={id} className="text-gray-800">
					{label}
				</label>
				<div
					className={cn(
						'inline-flex w-full items-center rounded-md h-[50px] bg-white border-2 overflow-clip px-2 focus-within:border-2 focus-within:border-primary',
						!!error ? 'border-error text-error' : '',
						readOnly ? 'border-gray-100' : 'border-gray-200',
						className,
					)}
				>
					{startContent}

					<input
						ref={ref}
						autoComplete="off"
						disabled={readOnly}
						value={value}
						placeholder={placeholder}
						onKeyDown={onKeyDown}
						className="relative rounded-md w-[95%] h-[90%] px-2 py-2 focus-visible:outline-none disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-300"
						{...rest}
					/>
					{endContent}
				</div>
				{error && (
					<label htmlFor={id}>
						<span className="text-error">{error}</span>
					</label>
				)}
			</div>
		)
	},
)
export default InputField
