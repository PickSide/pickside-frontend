import { Button, Checkbox, Icon, InputField, PasswordField } from '@components'
import { Controller, useFormContext } from 'react-hook-form'

import { FcGoogle } from 'react-icons/fc'
import { LoginFormProps } from '../interface/forms'
import useLogin from '../hooks/useLogin'
import useLoginAsGuest from '../hooks/useLoginAsGuest'
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
	const {
		loginAsGuest,
		isLoading: isLoginGuestLoading,
		isError: isLoginGuestError,
		error: loginGuestError,
	} = useLoginAsGuest()
	const { t } = useTranslation()

	const { control, handleSubmit } = useFormContext<LoginFormProps>()

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}

	const onLogin = async (data: any) => await login(data)

	const onGuestLogin = async (data: any) => await loginAsGuest(data)

	const onGoogleLogin = async (data: any) => await loginWithGoogle(data)

	return (
		<>
			{(isLoginError || isLoginGuestError || isGoogleLoginEror) && (
				<div className="rounded-sm border-2 text-center p-1 border-error text-red-900 bg-red-200 text-base">
					{loginError?.response.data.error.message || loginError?.message}
					{loginGuestError?.response.data.error.message || loginGuestError?.message}
					{googleLoginError?.response.data.error.message || googleLoginError?.message}
				</div>
			)}
			<form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-y-8 py-8">
				<Controller
					name="username"
					control={control}
					rules={baseRule}
					render={({ field }) => (
						<InputField
							{...field}
							type="text"
							autoFocus
							label={t('Username or email')}
							placeholder={t('Enter username or email')}
							startContent={<Icon icon="person" />}
							fullWidth
						/>
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
				<Controller
					name="rememberMe"
					control={control}
					render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} label={t('Remember me')} />}
				/>
				<Button type="submit" isLoading={isLoginLoading || isGoogleLoginLoading || isLoginGuestLoading}>
					{t('Login')}
				</Button>
				<Button
					variant="secondary"
					onClick={onGuestLogin}
					isLoading={isLoginLoading || isGoogleLoginLoading || isLoginGuestLoading}
				>
					{t('Continue as guest')}
				</Button>
				<Button
					type="submit"
					className="h-[40px] flex whitespace-nowrap gap-x-4 text-base font-medium items-center justify-center"
					variant="secondary"
					isLoading={isLoginLoading || isGoogleLoginLoading || isLoginGuestLoading}
					onClick={onGoogleLogin}
				>
					<FcGoogle size={20} />
					{t('Continue with google')}
				</Button>
			</form>
		</>
	)
}
