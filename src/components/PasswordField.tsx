import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import InputField, { InputFieldProps } from './shared/InputField'
import { forwardRef, useMemo, useState } from 'react'

import { BiLockAlt } from 'react-icons/bi'

const PasswordField = (props: InputFieldProps, ref) => {
	const [hidePassword, setHidePassword] = useState<boolean>(true)

	const type = useMemo(() => (hidePassword ? 'password' : 'text'), [hidePassword])

	return (
		<InputField
			type={type}
			startContent={<BiLockAlt size={20} />}
			endContent={
				<button
					tabIndex={-1}
					type="button"
					onClick={() => setHidePassword(!hidePassword)}
					className="rounded-md text-gray-500 cursor-pointer w-12 h-12 p-2 m-auto outline-none peer-hover:bg-gray-200"
				>
					{hidePassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
				</button>
			}
			ref={ref}
			{...props}
		/>
	)
}

export default forwardRef(PasswordField)
