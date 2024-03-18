import InputField, { InputFieldProps } from './shared/InputField'
import { forwardRef, useMemo, useState } from 'react'

import Icon from './shared/Icon'
import IconButton from './IconButton'

const PasswordField = (props: InputFieldProps, ref) => {
	const [hidePassword, setHidePassword] = useState<boolean>(true)

	const type = useMemo(() => (hidePassword ? 'password' : 'text'), [hidePassword])

	return (
		<InputField
			type={type}
			startContent={<Icon icon="lock" />}
			endContent={
				<IconButton tabIndex={-1} size="sm" onClick={() => setHidePassword(!hidePassword)}>
					{hidePassword ? <Icon icon="visibility_off" /> : <Icon icon="visibility" />}
				</IconButton>
			}
			ref={ref}
			{...props}
		/>
	)
}

export default forwardRef(PasswordField)
