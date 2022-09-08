import React, { FC } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikFieldText from '../formikFields/FormikTextField'
import { Button, DialogActions } from '@mui/material'

interface LoginFormProps {
	onClose: () => void
}

const LoginFormSchema = Yup.object().shape({
	email: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
})

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
	const onSubmit = (values: any) => console.log(`values: ${values}`)

	const resetForm = () => console.log('resetting form')

	const initialValues = {
		email: '',
		password: '',
	}

	return (
		<>
			<Formik
				validationSchema={LoginFormSchema}
				initialValues={initialValues}
				validateOnBlur={false}
				onSubmit={({ ...values }) => onSubmit(values)}
			>
				{({ setFieldValue, values, isSubmitting, isValid }) => (
					<Form>
						<FormikFieldText
							label="Email"
							type="email"
							name="email"
							value={values.email}
							placeholder="Email"
							onChange={(e) => setFieldValue('email', e.target.value)}
						/>
						<FormikFieldText
							label="Password"
							type="password"
							name="password"
							value={values.password}
							placeholder="Password"
							onChange={(e) => setFieldValue('password', e.target.value)}
						/>

						<DialogActions>
							<Button onClick={() => onClose()}>Cancel</Button>
							<Button disabled={isSubmitting || !isValid} type="submit">
								Login
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default LoginForm
