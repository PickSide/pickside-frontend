import { FC, useCallback, useState, forwardRef } from 'react'

interface ToggleProps {
	defaultChecked?: boolean
	label?: string
	onChange?: (e) => void
	primary?: boolean
	secondary?: boolean
	tertiary?: boolean
}

const Toggle = (
	{ defaultChecked = false, label, onChange, primary = true, secondary = false, tertiary = false }: ToggleProps,
	ref,
) => {
	const [checked, setChecked] = useState<boolean>(defaultChecked)

	const handleChange = useCallback(
		(e) => {
			setChecked((prev) => !prev)
			onChange && onChange(e)
		},
		[onChange],
	)

	return (
		<label className="inline-flex items-center relative mr-5 cursor-pointer">
			<input className="sr-only peer" type="checkbox" checked={checked} onChange={handleChange} />
			<div
				className="w-11 h-6 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
              peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px]
               after:bg-white after:border-gray-300 after:border after:rounded-full
                after:h-5 after:w-5 after:transition-all peer-checked:bg-[#107869]
                peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed"
			></div>
			{label && <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
		</label>
	)
}

export default forwardRef(Toggle)
