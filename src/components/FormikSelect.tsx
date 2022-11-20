import React, { FC } from 'react'
import { Field } from 'formik'
import { Box, Select, SelectProps } from '@mui/material'

interface FormikSelectProps extends SelectProps {
	horizontal?: boolean
}

const FormikSelect: FC<FormikSelectProps> = ({
	children,
	horizontal = false,
	multiple = false,
	label,
	name,
	placeholder,
	value,
	defaultValue,
}) => {
	return (
		<Box display="flex" margin={2} flexDirection={horizontal ? 'row' : 'column'}>
			<Field name={name} value={value}>
				{({
					field, // { name, value, onChange, onBlur }Î
					form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
					meta,
				}) => (
					<Select
						defaultValue={defaultValue}
						multiple={multiple}
						label={label}
						name={name}
						placeholder={placeholder}
						{...field}
					>
						{children}
					</Select>
				)}
			</Field>
		</Box>
	)
}

export default FormikSelect
