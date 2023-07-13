import { BiLockAlt, BiUser } from 'react-icons/bi'
import { Button, Checkbox, TextField } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { FC, useState } from 'react'
import { setAppTheme, setLocale } from 'state'

import { GoogleLogin } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import { useApi } from 'hooks'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

interface LoginFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	password: string
	remeberMe: boolean
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
	const { login, reactivate } = useApi()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const [apiError, setApiError] = useState<any>(null)
	const [loading, setLoading] = useState(false)

	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			username: '',
			password: '',
			remeberMe: false,
		},
	})

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}

	const onGoogleLoginSuccess = (response) => {
		console.log(response)
		navigate('/home')
	}

	const onSubmit = async (data: any) => {
		setLoading(true)

		const response = await dispatch<any>(login(data))
		if (response.error) {
			const errorMsg = response.error.message
			if (response.error.failReason === 'userinactive') {
				setApiError(
					<>
						<p>{errorMsg}</p>
						<p>{t('An email was sent to your email. Follow the instructions')}</p>
					</>,
				)
			}
			if (response.error.failReason === 'badrequest') {
				setApiError(<p>{errorMsg}</p>)
			}
			if (response.error.failReason === 'userexists') {
			}
		} else {
			if (response.user.preferredTheme) {
				await dispatch<any>(setAppTheme(response.user.preferredTheme))
			}
			if (response.user.preferredLocale) {
				await dispatch<any>(setLocale(response.user.preferredLocale.value))
			}
			navigate('/home')
		}

		setLoading(false)
	}

	return (
		<div className="flex flex-col gap-y-10 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[40px] font-semibold text-cyan-950">{t('Hi, Welcome back!')}</span>
				<span className="text-[15px] text-gray-300">{t('Start connecting in our sport community right away!')}</span>
			</div>
			{!!apiError && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					{apiError}
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full">
				<Controller
					name="username"
					control={control}
					rules={{
						...baseRule,
					}}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<TextField
							type="text"
							autofocus
							label={t('Username')}
							placeholder={t('Enter username')}
							startContent={<BiUser size={20} />}
							fullWidth
							{...field}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{
						...baseRule,
					}}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<TextField
							autofocus
							label={t('Password')}
							placeholder={t('Enter password')}
							startContent={<BiLockAlt size={20} />}
							isPassword
							fullWidth
							{...field}
						/>
					)}
				/>
				<Controller
					name="remeberMe"
					control={control}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<Checkbox label={t('Remember me')} {...field} />
					)}
				/>
				<Button
					text={t('Login')}
					type="submit"
					isLoading={loading}
					className="rounded-md bg-primary text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				/>
				<div className="w-full">
					<GoogleLogin onSuccess={onGoogleLoginSuccess} onError={() => console.log('error')} />
				</div>
			</form>
			<div className="flex gap-x-2">
				<span className="text-gray-500">{t(`Don't have an user?`)}</span>
				<Link to="/signup" className="font-semibold text-primary hover:text-gray-400/90 hover:scale-105">
					{t('Sign up')}
				</Link>
			</div>
		</div>
	)
}

export default LoginForm
