import { ComponentPropsWithRef, ReactNode, forwardRef, useId } from 'react'

interface UploadProps extends ComponentPropsWithRef<'input'> {
	text?: string | ReactNode
	isLoading?: boolean
}

const Upload = forwardRef<any, UploadProps>((
	{
		className,
		isLoading = false,
		text,
		...rest
	}: UploadProps | any
) => {
	const id = useId()

	return (
		<label
			htmlFor={id}
			className='h-fit rounded-md px-2 py-1 cursor-pointer text-[#5293C7] border border-[#5293C7] hover:bg-gray-300 disabled:text-gray-400 disabled:border-gray-200/30 disabled:bg-gray-200/60 dark:bg-white dark:text-black'

		>
			<p>{text}</p>
			<input
				id={id}
				className="hidden"
				accept=".png, .jpg, .jpeg"
				type="file"
				{...rest}
			/>
		</label>
	)
})

export default Upload
