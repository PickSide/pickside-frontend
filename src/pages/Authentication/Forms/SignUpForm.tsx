import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, DialogActions, Grid, MenuItem, TextField, Select } from '@mui/material'
import { useTranslation } from 'react-i18next'
interface SignUpFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	fullName: string
	email: string
	confirmEmail: string
	password: string
	confirmPassword: string
	sexe: 'male' | 'female' | undefined
}

const SignUpForm: FC<SignUpFormProps> = ({ onClose }) => {
	const { t } = useTranslation()
	const onSubmit = (values: any) => console.log(`values: ${values}`)
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			username: '',
			fullName: '',
			email: '',
			confirmEmail: '',
			password: '',
			confirmPassword: '',
			sexe: undefined,
		},
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container direction="column" rowSpacing={3}>
				<Grid item>
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<TextField label={t('Username')} placeholder={t('Enter username')} fullWidth {...field} />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="fullName"
						control={control}
						render={({ field }) => (
							<TextField label={t('Full name')} placeholder={t('Enter full name')} fullWidth {...field} />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="email"
						control={control}
						render={({ field }) => <TextField label={t('Email')} placeholder={t('Enter email')} fullWidth {...field} />}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="confirmEmail"
						control={control}
						render={({ field }) => (
							<TextField label={t('Confirm email')} placeholder={t('Confirm email')} fullWidth {...field} />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField label={t('Password')} placeholder={t('Enter password')} fullWidth {...field} />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<TextField label={t('Confirm password')} placeholder={t('Confirm password')} fullWidth {...field} />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="sexe"
						control={control}
						render={({ field }) => (
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
						<Button type="submit">{t('Register')}</Button>
					</DialogActions>
				</Grid>
			</Grid>
		</form>
	)
}

export default SignUpForm
