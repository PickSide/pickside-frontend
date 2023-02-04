import { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Alert, Button, DialogActions, Grid, MenuItem, TextField, Select, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { updateItem } from 'api'
import { connectToPlatform } from 'state/user'
import { omit } from 'lodash'
import { AuthConfig } from 'utils/context/AuthContext'
import { useAuth } from 'hooks'

interface SignUpFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	firstName: string
	lastName: string
	email: string
	confirmEmail: string
	password: string
	confirmPassword: string
	sexe: 'male' | 'female' | undefined
}

const SignUpForm: FC<SignUpFormProps> = ({ onClose }) => {
	const { setAuthConfig } = useAuth()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<FormData>({
		defaultValues: {
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			confirmEmail: '',
			password: '',
			confirmPassword: '',
			sexe: undefined,
		},
	})

	const [apiMessage, setApiMessage] = useState(null)

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}
	const validationEmail = {
		validate: {
			matchingField: (value) => value === getValues('email') || t('Emails must be the same.'),
		},
	}
	const validationPassword = {
		validate: {
			matchingField: (value) => value === getValues('password') || 'Passwords must be the same.',
		},
	}

	const onSubmit = async (data) => {
		const { username, password, message } = await dispatch<any>(
			updateItem({
				method: 'POST',
				endpoint: 'users/create',
				data: omit(data, ['confirmEmail', 'confirmPassword']),
			}),
		)

		if (username && username) {
			const { accessToken, connectedUser } = await dispatch<any>(connectToPlatform({ username, password }))
			const auth = { accessToken, connectedUser } as AuthConfig
			setAuthConfig(auth)
			onClose()
		} else {
			setApiMessage(message)
		}
	}
	const onError = (error) => console.log(error)

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<>
					<Grid container direction="column" rowSpacing={3}>
						<Grid item>
							{!!apiMessage && (
								<Alert variant="outlined" severity="error">
									{apiMessage}
								</Alert>
							)}
						</Grid>

						<Grid item>
							<Controller
								name="username"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
									<TextField label={t('Username')} placeholder={t('Enter username')} fullWidth {...field} />
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="firstName"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
									<TextField label={t('First name')} placeholder={t('Enter first name')} fullWidth {...field} />
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="lastName"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
									<TextField label={t('Last name')} placeholder={t('Enter last name')} fullWidth {...field} />
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="email"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
									<TextField label={t('Email')} type="email" placeholder={t('Enter email')} fullWidth {...field} />
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="confirmEmail"
								rules={{
									...baseRule,
									...validationEmail,
								}}
								control={control}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error } }) => {
									console.log(error, invalid, isDirty, isTouched)
									return (
										<TextField
											label={t('Confirm email')}
											error={!!error}
											placeholder={t('Confirm email')}
											fullWidth
											{...field}
										/>
									)
								}}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="password"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
									<TextField
										label={t('Password')}
										type="password"
										placeholder={t('Enter password')}
										fullWidth
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="confirmPassword"
								control={control}
								rules={{
									...baseRule,
									...validationPassword,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState: { errors } }) => (
									<TextField
										label={t('Confirm password')}
										error={!!error}
										type="password"
										placeholder={t('Confirm password')}
										fullWidth
										{...field}
									/>
								)}
							/>
						</Grid>
						<Grid item>
							<Controller
								name="sexe"
								control={control}
								rules={{
									...baseRule,
								}}
								render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
									<Select label={t('Sexe')} defaultValue="DEFAULT" placeholder={t('Sexe')} fullWidth {...field}>
										<MenuItem value="DEFAULT">{t('Sexe')}</MenuItem>
										<MenuItem key="male" value="male">
											{t('Male')}
										</MenuItem>
										<MenuItem key="female" value="female">
											{t('Female')}
										</MenuItem>
									</Select>
								)}
							/>
						</Grid>

						<Grid item>
							<DialogActions>
								<Button onClick={() => onClose()}>{t('Cancel')}</Button>
								<Button disabled={!isValid} type="submit">
									{t('Register')}
								</Button>
							</DialogActions>
						</Grid>
					</Grid>
				</>
			</form>
		</Container>
	)
}

export default SignUpForm
