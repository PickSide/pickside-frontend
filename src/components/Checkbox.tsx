import { FC, ReactNode, useCallback, useState, useRef, useEffect, forwardRef } from 'react'

import { Button } from 'components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

interface CheckboxProps {
	dense?: boolean
	label?: string
}

const Checkbox = ({ dense = false, label, ...props }: CheckboxProps | any, ref) => {
	const inputRef = useRef<any>(null)

	const [checked, setChecked] = useState<boolean>(false)
	const [onFocus, setOnFocus] = useState<boolean>()
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const _onFocus = useCallback(() => setOnFocus(true), [])
	const _onBlur = useCallback(() => setOnFocus(false), [])
	const _onChange = useCallback((e) => setChecked(e.target.checked), [])

	useEffect(() => {
		inputRef.current.focus()
	}, [inputRef])

	return (
		<div className={`relative flex w-fit ${dense ? 'mb-6' : ''}`}>
			<div className="inline-flex items-center gap-x-3">
				<input
					type="checkbox"
					autoComplete="off"
					//checked={checked}
					ref={inputRef}
					onFocus={_onFocus}
					onBlur={_onBlur}
					onChange={_onChange}
					className="relative cursor-pointer indeterminate:border-slate-400 rounded-md w-4 h-4 accent-primary text-primary bg-secondary"
					{...props}
				/>
				<label htmlFor={props.id}>
					<span className="">{label}</span>
				</label>
			</div>
		</div>
	)
}

export default forwardRef(Checkbox)
