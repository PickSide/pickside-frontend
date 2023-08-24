import { BiLockAlt, BiUser } from 'react-icons/bi'
import { Button, Checkbox, TextField } from '@components'
import { Controller, useFormContext } from 'react-hook-form'

import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { LoginFormProps } from '../interface/forms'
import axios from 'axios'
import { useDevice } from '@hooks'
import { useDispatch } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import useLogin from '../hooks/useLogin'
import useLoginWithGoogle from '../hooks/useLoginWithGoogle'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LoginForm() {
	const [apiError, setApiError] = useState<any>(null)
	const [loading, setLoading] = useState(false)

	const [device] = useDevice()
	const dispatch = useDispatch()
	const login = useLogin()
	const loginWithGoogle = useLoginWithGoogle()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const { control, handleSubmit } = useFormContext<LoginFormProps>()

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}

	const onLogin = async (data: any) => {
		setLoading(true)
		const response = await dispatch<any>(login(data))
		handleLogin(response)
		setLoading(false)
	}

	const onGoogleLogin = useGoogleLogin({
		onSuccess: async ({ access_token }) => {
			setLoading(true)
			await axios
				.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
					headers: {
						Authorization: `Bearer ${access_token}`,
						Accept: 'application/json',
					},
				})
				.then(async (profileInfo) => {
					const response = await dispatch<any>(loginWithGoogle(profileInfo.data))
					handleLogin(response)
					setLoading(false)
				})
				.catch((err) => console.log(err))
		},
		onError: () => console.log('error'),
		flow: 'implicit',
	})

	const handleLogin = (response) => {
		if (response.error) {
			if (response.error.failReason === 'userinactive') {
				setApiError(
					<>
						<p>{response.error.message}</p>
						<p>{t('An email was sent to your email. Follow the instructions')}</p>
					</>,
				)
			} else {
				setApiError(<p>{response.error.message}</p>)
			}
		} else {
			navigate('/home')
		}
	}

	const FormHandle = () => (
		<form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-y-7 lg:gap-y-4 w-full">
			<Controller
				name="username"
				control={control}
				rules={{
					...baseRule,
				}}
				render={({ field }) => (
					<TextField
						{...field}
						type="text"
						autofocus
						label={t('Username')}
						placeholder={t('Enter username')}
						startContent={<BiUser size={20} />}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="password"
				control={control}
				rules={{
					...baseRule,
				}}
				render={({ field }) => (
					<TextField
						{...field}
						autofocus
						label={t('Password')}
						placeholder={t('Enter password')}
						startContent={<BiLockAlt size={20} />}
						isPassword
						fullWidth
					/>
				)}
			/>
			<Controller
				name="remeberMe"
				control={control}
				render={({ field }) => <Checkbox {...field} label={t('Remember me')} />}
			/>
			<Button
				type="submit"
				isLoading={loading}
				className="rounded-md bg-primary text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
			>
				{t('Login')}
			</Button>
			<Button
				type="button"
				variant="secondary"
				isLoading={loading}
				onClick={() => onGoogleLogin()}
				className="h-[50px] flex whitespace-nowrap gap-x-4 text-[13px] items-center justify-center"
			>
				<FcGoogle size={20} />
				{t('Continue with google')}
			</Button>
		</form>
	)

	const MobileLoginForm = () => (
		<div className="flex flex-col gap-y-10 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[25px] font-semibold text-cyan-950">{t('Hi, Welcome back!')}</span>
			</div>
			{!!apiError && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					{apiError}
				</div>
			)}
			<FormHandle />
			<div className="flex gap-x-2">
				<span className="text-gray-500">{t(`Don't have an user?`)}</span>
				<Link to="/signup" className="font-semibold text-primary hover:text-gray-400/90 hover:scale-105">
					{t('Sign up')}
				</Link>
			</div>
		</div>
	)

	return device === 'mobile' ? (
		<MobileLoginForm />
	) : (
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
			<FormHandle />
			<div className="flex gap-x-2">
				<span className="text-gray-500">{t(`Don't have an user?`)}</span>
				<Link to="/signup" className="font-semibold text-primary hover:text-gray-400/90 hover:scale-105">
					{t('Sign up')}
				</Link>
			</div>
		</div>
	)
}
