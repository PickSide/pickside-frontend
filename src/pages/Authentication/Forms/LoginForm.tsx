import React, { FC } from 'react'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikFieldText from '../../../components/FormikTextField'
import { Button, DialogActions } from '@mui/material'
import { connectToPlatform } from 'state/user'
import { useDispatch } from 'react-redux'

interface LoginFormProps {
	onClose: () => void
}

const LoginFormSchema = Yup.object().shape({
	username: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
})

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
	const dispatch = useDispatch()

	const onSubmit = (values: any) => dispatch<any>(connectToPlatform(values))

	const resetForm = () => console.log('resetting form')

	const initialValues = {
		username: '',
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
							label="Username"
							type="text"
							name="username"
							value={values.username}
							placeholder="Username"
							onChange={(e) => setFieldValue('username', e.target.value)}
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
