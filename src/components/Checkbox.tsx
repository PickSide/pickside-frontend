import { FC, ReactNode, useCallback, useState, useRef, useEffect, forwardRef } from 'react'

import { Button } from 'components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs'

interface CheckboxProps {
	dense?: boolean
	label?: string
}

const Checkbox = ({ dense = false, label, ...props }: CheckboxProps | any, ref) => {
	return (
		<div className={`relative flex w-fit ${dense ? 'mb-6' : ''}`}>
			<div className="inline-flex items-center gap-x-3">
				<input
					type="checkbox"
					autoComplete="off"
					ref={ref}
					className="relative cursor-pointer bg-gray-100 border-gray-300 rounded w-4 h-4 accent-primary text-primary"
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
