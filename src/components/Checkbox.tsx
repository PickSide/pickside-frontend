import { forwardRef } from 'react'

interface CheckboxProps {
	label?: string
}

const Checkbox = ({ label, ...props }: CheckboxProps | any, ref) => {
	return (
		<div className={`relative flex w-fit`}>
			<div className="inline-flex items-center gap-x-3">
				<input
					type="checkbox"
					autoComplete="off"
					ref={ref}
					className="relative cursor-pointer bg-gray-100 border-gray-300 rounded w-4 h-4 accent-ocean text-ocean"
					{...props}
				/>
				<label htmlFor={props.id}>
					<span className="text-gray-300">{label}</span>
				</label>
			</div>
		</div>
	)
}

export default forwardRef(Checkbox)
