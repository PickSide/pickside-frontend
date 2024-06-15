import { Alert, Button, Checkbox, EmailField, Icon, InputField, PasswordField } from '@components'
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '@utils'
import { useFormContext, useFormState } from 'react-hook-form'

import { SignupFormProps } from '../interface/forms'
import { omit } from 'lodash'
import useSignup from '../hooks/useSignup'
import { useTranslation } from 'react-i18next'

const SignUpForm = () => {
	const { handleSubmit, getValues, register, watch } = useFormContext<SignupFormProps>()
	const { errors } = useFormState()
	const { signup, error, isError, isLoading } = useSignup()
	const { t } = useTranslation()

	const onSubmit = async (data) => await signup(omit({ ...data, accountType: 'system' }, 'confirmPassword'))

	return (
		<>
			{!!isError && (
				<Alert className="w-full" icon="block" severity="error">
					<span className="capitalize">{error?.response.data.msg}</span>
				</Alert>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 py-8">
				<InputField
					type="text"
					label={t('Full name')}
					placeholder={t('Enter your full name')}
					startContent={<Icon icon="person" />}
					error={errors.fullName?.message}
					aria-invalid={!!errors.fullName}
					fullWidth
					{...register('fullName', { required: t('Field is required') })}
				/>

				<EmailField
					label={t('Email')}
					placeholder={t('Enter email')}
					startContent={<Icon icon="alternate_email" />}
					error={errors.email?.message}
					aria-invalid={!!errors.email}
					fullWidth
					{...register('email', {
						required: t('Field is required'),
						pattern: { value: EMAIL_REGEX, message: t('Email wrong format') },
					})}
				/>

				<PasswordField
					label={t('Password')}
					placeholder={t('Enter password')}
					error={errors.password?.message}
					aria-invalid={!!errors.password}
					fullWidth
					{...register('password', {
						required: t('Field is required'),
						pattern: { value: PASSWORD_REGEX, message: t('Password does not meet requirement') },
					})}
				/>

				<PasswordField
					label={t('Confirm password')}
					placeholder={t('Confirm password')}
					error={errors.confirmPassword?.message}
					aria-invalid={!!errors.confirmPassword}
					fullWidth
					{...register('confirmPassword', {
						required: t('Field is required'),
						validate: (value) => value === getValues('password') || t('Passwords must be the same'),
					})}
				/>

				<Checkbox label={t('I agree to the terms of service and privacy policy.')} {...register('agreedToTerms')} />

				<Button
					type="submit"
					disabled={!watch('agreedToTerms')}
					isLoading={isLoading}
					className="rounded-md bg-ocean text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				>
					{t('Sign up')}
				</Button>
			</form>
		</>
	)
}

export default SignUpForm
