import { ComponentPropsWithRef, forwardRef } from 'react'

import { cn } from '@utils'

interface TextAreaFieldProps extends ComponentPropsWithRef<'textarea'> {
	error?: any
	fullWidth?: boolean
	label?: string
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
	({ id, defaultValue, error, fullWidth = false, label, readOnly = false, ...rest }: TextAreaFieldProps, ref) => {
		return (
			<div className={cn('relative flex flex-col', fullWidth ? 'w-full' : 'w-[230px]')}>
				<label htmlFor={id} className="text-gray-800">
					{label}
				</label>
				<div
					className={cn(
						'inline-flex w-full items-center rounded-md bg-white border-2 focus-within:border-2 focus-within:border-ocean',
						error && 'border-[#d2333d] text-[#d2333d]',
						readOnly && 'border-gray-100',
					)}
				>
					<div className="px-2 w-full">
						<textarea
							ref={ref}
							defaultValue={defaultValue}
							className="relative rounded-md w-[100%] h-[90%] px-2 py-2 focus-visible:outline-none"
							{...rest}
						/>
					</div>
				</div>
			</div>
		)
	},
)

export default TextAreaField
