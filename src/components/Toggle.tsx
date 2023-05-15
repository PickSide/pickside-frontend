import { FC, useState, forwardRef } from 'react'

const Toggle = ({ ...props }, ref) => {
	const [isChecked, setIsChecked] = useState<boolean>(false)
	const _onChange = (e) => {
		setIsChecked(e.target.checked)
		if (props.onChange) {
			props.onChange()
		}
	}

	return (
		<label className="relative inline-flex items-center mr-5 cursor-pointer">
			<input className="sr-only peer" type="checkbox" checked={isChecked} onChange={_onChange} />
			<div
				className="w-11 h-6 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
              peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
               after:bg-white after:border-gray-300 after:border after:rounded-full
                after:h-5 after:w-5 after:transition-all peer-checked:bg-[#107869]
                peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed"
			></div>
			<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{props.label}</span>
		</label>
	)
}

export default forwardRef(Toggle)
