import { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Checkbox, TextField } from 'components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useAuth } from 'hooks'
import { BiLockAlt, BiUser } from 'react-icons/bi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { isEmpty } from 'lodash'
import { EMAIL_REGEX, PASSWORD_REGEX, FULL_NAME_REGEX, PHONE_REGEX } from 'utils'
import { useNavigate } from 'react-router'

interface SignUpFormProps {
	onClose: () => void
}

const SignUpForm: FC<SignUpFormProps> = () => {
	const { create, login } = useAuth()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const {
		handleSubmit,
		getValues,
		formState: { errors, isValid },
		register,
		watch,
	} = useForm<any>({
		reValidateMode: 'onSubmit',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
	})

	const [apiError, setApiError] = useState(null)
	const [loading, setLoading] = useState(false)

	const onSubmit = async (data) => {
		if (!isValid) {
			return
		}
		setLoading(true)

		const response = await dispatch<any>(create(data))

		if (response.payload) {
			await dispatch<any>(login({ username: data.username, password: data.password }))
			navigate('/home')
		}

		if (response.error) {
			setApiError(response.error)
		}

		setLoading(false)
	}
	console.log(errors)
	return (
		<div className="flex flex-col gap-y-5 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[40px] font-semibold text-cyan-950">{t('Hi, Welcome back!')}</span>
				<span className="text-[15px] text-gray-300">{t('Start connecting in our sport community right away!')}</span>
			</div>
			{!!apiError && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					{apiError && <p>{apiError}</p>}
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-full">
				<TextField
					type="text"
					autofocus
					label={t('Username')}
					placeholder={t('Enter username')}
					startContent={<BiUser size={20} />}
					error={errors.username?.message}
					aria-invalid={!!errors.username}
					fullWidth
					{...register('username', { required: t('Field is required') })}
				/>

				<div className="inline-flex gap-x-4">
					<TextField
						type="text"
						label={t('First name')}
						placeholder={t('Enter your first name')}
						startContent={<BiUser size={20} />}
						error={errors.firstName?.message}
						aria-invalid={!!errors.firstName}
						fullWidth
						{...register('firstName', { required: t('Field is required') })}
					/>
					<TextField
						type="text"
						label={t('Last name')}
						placeholder={t('Enter your last name')}
						startContent={<BiUser size={20} />}
						error={errors.lastName?.message}
						aria-invalid={!!errors.lastName}
						fullWidth
						{...register('lastName', { required: t('Field is required') })}
					/>
				</div>

				<TextField
					label={t('Email')}
					placeholder={t('Enter email')}
					startContent={<MdOutlineAlternateEmail size={20} />}
					error={errors.email?.message}
					aria-invalid={!!errors.email}
					fullWidth
					{...register('email', { required: true, pattern: { value: EMAIL_REGEX, message: t('Email wrong format') } })}
				/>

				<TextField
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

				<TextField
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

				<TextField
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
				<Checkbox label={t('I agree to the terms of service and privacy policy.')} {...register('agreement')} />

				<Button
					text={t('Sign up')}
					type="submit"
					disabled={!watch('agreement')}
					isLoading={loading}
					className="rounded-md bg-primary text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				/>
			</form>
		</div>
	)
}

export default SignUpForm
