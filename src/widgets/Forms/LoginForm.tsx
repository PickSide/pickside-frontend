import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Container, DialogActions, Grid, TextField } from '@mui/material'

import { useAuth, useLocalStorage } from 'hooks'

interface LoginFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	password: string
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
	const { login } = useAuth()
	const dispatch = useDispatch()
	const { set: setLocalStorage } = useLocalStorage()
	const { t } = useTranslation()

	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = async (values: any) => {
		await dispatch<any>(login(values))
		onClose()
	}

	return (
		<Container>
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
							name="password"
							control={control}
							render={({ field }) => (
								<TextField label={t('Password')} placeholder={t('Enter password')} fullWidth {...field} />
							)}
						/>
					</Grid>

					<Grid item>
						<DialogActions>
							<Button onClick={() => onClose()}>{t('Cancel')}</Button>
							<Button type="submit">{t('Login')}</Button>
						</DialogActions>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}

export default LoginForm
