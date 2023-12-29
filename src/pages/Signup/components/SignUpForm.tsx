import { Button, Checkbox, EmailField, Icon, InputField, PasswordField } from '@components'
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '@utils'
import { useFormContext, useFormState } from 'react-hook-form'

import { AiFillPhone } from 'react-icons/ai'
import { SignupFormProps } from '../interface/forms'
import { omit } from 'lodash'
import useSignup from '../hooks/useSignup'
import { useTranslation } from 'react-i18next'

const SignUpForm = () => {
	const { handleSubmit, getValues, register, watch } = useFormContext<SignupFormProps>()
	const { errors } = useFormState()
	const { signup, error, isError, isLoading } = useSignup()
	const { t } = useTranslation()

	const onSubmit = async (data) => await signup(omit(data, 'confirmPassword'))

	return (
		<>
			{!!isError && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					<p>{error.response.data.error.message || error.message}</p>
				</div>
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
					{...register('email', { required: t('Field is required'), pattern: { value: EMAIL_REGEX, message: t('Email wrong format') } })}
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
						validate: (value) => value === getValues('password') || t('Passwords must be the same')
					})}
				/>

				<InputField
					label={t('Phone number')}
					placeholder={t('Enter phone')}
					startContent={<AiFillPhone size={20} />}
					error={errors.phone?.message}
					aria-invalid={!!errors.phone}
					fullWidth
					{...register('phone', {
						required: t('Field is required'),
						pattern: { value: PHONE_REGEX, message: t('Phone wrong format') },
					})}
				/>

				<Checkbox label={t('I agree to the terms of service and privacy policy.')} {...register('agreement')} />

				<Button
					type="submit"
					disabled={!watch('agreement')}
					isLoading={isLoading}
					className="rounded-md bg-primary text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				>
					{t('Sign up')}
				</Button>
			</form>
		</>
	)
}

export default SignUpForm
