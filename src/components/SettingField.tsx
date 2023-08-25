import { Children, cloneElement, forwardRef } from 'react'

import { BiLock } from 'react-icons/bi'

interface SettingFieldProps {
	settingName?: string
	helperText?: string
	value?: any
	readOnly?: boolean
	disabled?: boolean
	children?: any | any[]
}

const SettingField = (
	{ settingName, helperText, value, children, readOnly = false, disabled = false }: SettingFieldProps,
	ref,
) => {
	return (
		<div aria-disabled={disabled} className="w-full flex justify-between items-center">
			<div className="flex flex-col">
				<p className="inline-flex items-center gap-x-2 text-[18px] font-semibold">
					{settingName}
					{readOnly && <BiLock className="text-gray-400" size={15} />}
				</p>
				<span className="text-[14px] font-normal text-gray-400">{helperText}</span>
			</div>
			{Children.map(children, (child) => cloneElement(child, { readOnly, disabled }))}
		</div>
	)
}

export default forwardRef(SettingField)
