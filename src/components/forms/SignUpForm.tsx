import React, { FC } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import FormikFieldText from '../formikFields/FormikTextField'
import FormikSelect from '../formikFields/FormikSelect'
import { Box, Button, DialogActions, MenuItem } from '@mui/material'
//import { REGEX_STRONG_PASSWORD } from 'utils/regex'

interface SignUpFormProps {
	onClose: () => void
}

const SignUpFormSchema = Yup.object().shape({
	firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(8, 'Too Short!')
		.max(16, 'Too long')
		//.matches(REGEX_STRONG_PASSWORD)
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Required'),
	sexe: Yup.string().oneOf(['male', 'female']).notRequired(),
})

const SignUpForm: FC<SignUpFormProps> = ({ onClose }) => {
	const onSubmit = (values: any) => console.log(`values: ${values}`)

	const initialValues = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		sexe: '',
	}

	return (
		<>
			<Formik validationSchema={SignUpFormSchema} initialValues={initialValues} onSubmit={(values) => onSubmit(values)}>
				{({ setFieldValue, values, isSubmitting, isValid }) => (
					<Form>
						<FormikFieldText label="Email" type="email" name="email" placeholder="Email" value={values.email} />
						<FormikFieldText label="First Name" name="firstName" placeholder="First Name" value={values.firstName} />
						<FormikFieldText label="Last Name" name="lastName" placeholder="Last Name" value={values.lastName} />
						<FormikFieldText
							label="Password"
							type="password"
							name="password"
							placeholder="Password"
							value={values.password}
						/>
						<FormikFieldText
							label="Confirm Password"
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={values.confirmPassword}
						/>
						<FormikSelect
							label="Sexe"
							name="sexe"
							defaultValue="DEFAULT"
							value={values.sexe}
							placeholder="Password"
							onChange={(e) => setFieldValue('sexe', e.target.value)}
						>
							<MenuItem value="DEFAULT">Sexe</MenuItem>
							<MenuItem key="male" value="male">
								Male
							</MenuItem>
							<MenuItem key="female" value="female">
								Female
							</MenuItem>
						</FormikSelect>
						<DialogActions>
							<Button onClick={() => onClose()}>Cancel</Button>
							<Button disabled={isSubmitting || !isValid} type="submit">
								Sign up
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default SignUpForm
