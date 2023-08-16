import { ReactNode, forwardRef, useId } from 'react'

import { ButtonVariant } from '@utils'
import { twMerge } from 'tailwind-merge'

interface UploadProps {
	variant?: ButtonVariant
	text?: ReactNode
	disabled?: boolean
	isLoading?: boolean
	showTooltip?: boolean
	onClick?: (e?) => void
	className?: string
}

const Upload = (
	{
		className,
		onChange,
		isLoading = false,
		disabled = false,
		showTooltip = false,
		text,
		variant = 'primary',
		...rest
	}: UploadProps | any,
	ref,
) => {
	const id = useId()
	const variants = {
		primary: 'text-white bg-primary hover:bg-gray-300 disabled:bg-gray-300/60 dark:bg-white dark:text-black',
		secondary:
			'text-[#5293C7] border-[1px] border-[#5293C7] hover:bg-gray-300 disabled:text-gray-400 disabled:border-gray-200/30 disabled:bg-gray-200/60 dark:bg-white dark:text-black',
		tertiary: 'text-primary dak:bg-none dark:text-white',
		danger: 'text-white bg-red-600 hover:bg-red-400',
	}

	return (
		<label
			htmlFor={id}
			className={twMerge(
				'flex justify-center whitespace-nowrap rounded-md p-1 text-',
				[variants[variant], className].join(' '),
			)}
		>
			<p>{text}</p>
			<input
				type="file"
				accept="image/*"
				id={id}
				className="hidden"
				disabled={disabled}
				onChange={onChange}
				{...rest}
			/>
		</label>
	)
}

export default forwardRef(Upload)
