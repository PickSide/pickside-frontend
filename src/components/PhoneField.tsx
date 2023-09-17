import { AiFillPhone } from 'react-icons/ai'
import InputField from './shared/InputField'
import { forwardRef } from 'react'

interface PhoneFieldProps {
	id?: string
	label?: string
	placeholder?: string
	autofocus?: boolean
	readOnly?: boolean
	error?: any
	defaultValue?: string
}
const PhoneField = (
	{ id, defaultValue, readOnly = false, error, autofocus = false, label, ...rest }: PhoneFieldProps,
	ref,
) => {
	return <InputField label={label} startContent={<AiFillPhone size={20} />} ref={ref} {...rest} />
}

export default forwardRef(PhoneField)
