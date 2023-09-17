import { BiLockAlt, BiUser } from 'react-icons/bi'
import { Button, Checkbox, InputField } from '@components'
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '@utils'
import { useFormContext, useFormState } from 'react-hook-form'

import { AiFillPhone } from 'react-icons/ai'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { SignupFormProps } from '../interface/forms'
import { useDevice } from '@hooks'
import useSignup from '../hooks/useSignup'
import { useTranslation } from 'react-i18next'

const SignUpForm = () => {
	const [device] = useDevice()
	const { handleSubmit, getValues, register, watch } = useFormContext<SignupFormProps>()
	const { errors, isValid } = useFormState()
	const { signup, error, isError, isLoading } = useSignup()
	const { t } = useTranslation()

	const onSubmit = async (data) => await signup(data)
	console.log(error)
	const FormHandle = () => (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 lg:gap-y-10 lg:w-full">
			<InputField
				type="text"
				label={t('Full name')}
				placeholder={t('Enter your full name')}
				startContent={<BiUser size={20} />}
				error={errors.fullName?.message}
				aria-invalid={!!errors.fullName}
				fullWidth
				{...register('fullName', { required: t('Field is required') })}
			/>

			<InputField
				label={t('Email')}
				placeholder={t('Enter email')}
				startContent={<MdOutlineAlternateEmail size={20} />}
				error={errors.email?.message}
				aria-invalid={!!errors.email}
				fullWidth
				{...register('email', { required: true, pattern: { value: EMAIL_REGEX, message: t('Email wrong format') } })}
			/>

			<InputField
				label={t('Password')}
				placeholder={t('Enter password')}
				startContent={<BiLockAlt size={20} />}
				error={errors.password?.message}
				aria-invalid={!!errors.password}
				fullWidth
				isPassword
				{...register('password', {
					required: 'Field is required',
					pattern: { value: PASSWORD_REGEX, message: t('Password does not meet requirement') },
				})}
			/>

			<InputField
				label={t('Confirm password')}
				placeholder={t('Confirm password')}
				startContent={<BiLockAlt size={20} />}
				error={errors.confirmPassword?.message}
				aria-invalid={!!errors.confirmPassword}
				fullWidth
				isPassword
				{...register('confirmPassword', {
					required: 'Field is required',
					validate: (value) => value === getValues('password') || 'Passwords must be the same.',
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
					required: 'Field is required',
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
	)

	const MobileSignUpForm = () => (
		<div className="flex flex-col gap-y-10 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[25px] font-semibold text-cyan-950">{t('Hi, Welcome back!')}</span>
			</div>
			{!!isError && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					{error.response.data.error.message || error.message}
				</div>
			)}
			<FormHandle />
		</div>
	)

	return device === 'mobile' ? (
		<MobileSignUpForm />
	) : (
		<div className="flex flex-col gap-y-5 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[40px] font-semibold text-cyan-950">{t('Hi, Welcome back!')}</span>
				<span className="text-[15px] text-gray-300">{t('Start connecting in our sport community right away!')}</span>
			</div>
			{!!isError && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					<p>{error.response.data.error.message || error.message}</p>
				</div>
			)}
			<FormHandle />
		</div>
	)
}

export default SignUpForm
