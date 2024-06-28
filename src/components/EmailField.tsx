import InputField, { InputFieldProps } from './shared/InputField'

import { forwardRef } from 'react'

const EmailField = (props: InputFieldProps) => <InputField type="email" {...props} />

export default forwardRef(EmailField)
