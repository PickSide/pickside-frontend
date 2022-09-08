import React, { FC } from 'react'
import { Field } from 'formik'
import { Box, TextField } from '@mui/material'

interface FormikTextFieldProps {
	label?: string
	name?: string
	placeholder?: string
	type?: 'text' | 'email' | 'password'
	value?: string
	horizontal?: boolean
	fullWidth?: boolean
	onChange?: (e: any) => void
}

const FormikTextField: FC<FormikTextFieldProps> = ({
	label,
	name,
	type = 'text',
	placeholder,
	value,
	horizontal = false,
	fullWidth = false,
}) => {
	return (
		<Box display="flex" margin={2} flexDirection={horizontal ? 'row' : 'column'}>
			<Field name={name} value={value}>
				{({
					field, // { name, value, onChange, onBlur }
					form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
					meta,
				}) => <TextField type={type} label={label} name={name} placeholder={placeholder} {...field} />}
			</Field>
		</Box>
	)
}

export default FormikTextField
