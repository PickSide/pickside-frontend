import { cloneElement, forwardRef } from 'react'
import { BiLock } from 'react-icons/bi'

interface SettingFieldProps {
	settingName?: string
	helperText?: string
	value?: any
	readOnly?: boolean
	children?: any
}

const SettingField = ({ settingName, helperText, value, children, readOnly = false }: SettingFieldProps, ref) => {
	return (
		<div className="w-full flex justify-between items-center">
			<div className="flex flex-col">
				<p className="inline-flex items-center gap-x-2 text-[18px] font-semibold">
					{settingName}
					{readOnly && <BiLock className='text-gray-400' size={15} />}
				</p>
				<span className="text-[14px] font-normal text-gray-400">{helperText}</span>
			</div>
			{cloneElement(children, { readOnly })}
		</div>
	)
}

export default forwardRef(SettingField)
