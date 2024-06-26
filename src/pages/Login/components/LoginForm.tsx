import { Alert, Button, EmailField, PasswordField } from '@components'
import { Controller, useFormContext } from 'react-hook-form'

import { FcGoogle } from 'react-icons/fc'
import { LoginFormProps } from '../interface/forms'
import useLogin from '../hooks/useLogin'
import useLoginWithGoogle from '../hooks/useLoginWithGoogle'
import { useTranslation } from 'react-i18next'

export default function LoginForm() {
	const { login, isLoading: isLoginLoading, isError: isLoginError, error: loginError } = useLogin()
	const {
		loginWithGoogle,
		isLoading: isGoogleLoginLoading,
		isError: isGoogleLoginEror,
		error: googleLoginError,
	} = useLoginWithGoogle()
	const { t } = useTranslation()

	const { control, handleSubmit } = useFormContext<LoginFormProps>()

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}

	const onLogin = async (data: any) => await login(data)
	const onGoogleLogin = async (data: any) => await loginWithGoogle(data)

	return (
		<>
			{isLoginError && (
				<Alert className="w-full" icon="block" severity="error">
					<span className='capitalize'>{loginError?.response.data.msg}</span>
				</Alert>
			)}
			{isGoogleLoginEror && (
				<Alert className="w-full" icon="block" severity="error">
					{googleLoginError?.response.data.message || googleLoginError?.message}
				</Alert>
			)}
			<form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-y-8 py-8">
				<Controller
					name="email"
					control={control}
					rules={baseRule}
					render={({ field }) => (
						<EmailField {...field} autoFocus label={t('Email')} placeholder={t('Enter email')} fullWidth />
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={baseRule}
					render={({ field }) => (
						<PasswordField {...field} label={t('Password')} placeholder={t('Enter password')} fullWidth />
					)}
				/>
				<Button type="submit" isLoading={isLoginLoading || isGoogleLoginLoading}>
					{t('Login')}
				</Button>
				<Button
					type="submit"
					disabled
					className="h-[40px] flex whitespace-nowrap gap-x-4 text-base font-medium items-center justify-center"
					variant="secondary"
					isLoading={isLoginLoading || isGoogleLoginLoading}
					onClick={onGoogleLogin}
				>
					<FcGoogle size={20} />
					{t('Continue with google')}
				</Button>
			</form>
		</>
	)
}
