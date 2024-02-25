import InputField, { InputFieldProps } from './shared/InputField'

import Icon from './shared/Icon'
import { forwardRef } from 'react'

const EmailField = (props: InputFieldProps, ref) => <InputField
	type='email'
	startContent={<Icon icon="alternate_email" />}
	ref={ref}
	{...props}
/>



export default forwardRef(EmailField)
