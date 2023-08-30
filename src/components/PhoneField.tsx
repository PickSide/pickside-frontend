import { AiFillPhone } from 'react-icons/ai'
import TextField from './shared/TextField'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

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
	const { t } = useTranslation()

	return (
		<TextField
			label={label}
			startContent={<AiFillPhone size={20} />}
			placeholder={t('Enter your location')}
			ref={ref}
			{...rest}
		/>
	)
}

export default forwardRef(PhoneField)
