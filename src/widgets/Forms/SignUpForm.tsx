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
import { EMAIL_REGEX, PASSWORD_REGEX, FULL_NAME_REGEX } from 'utils'
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
		control,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm<any>({
		reValidateMode: 'onSubmit',
		resetOptions: {
			keepDirtyValues: false,
			keepErrors: false,
		},
		defaultValues: {
			username: '',
			fullName: '',
			email: '',
			phone: '',
			confirmEmail: '',
			password: '',
			confirmPassword: '',
			sexe: undefined,
		},
	})
	console.log(errors)
	const [apiError, setApiError] = useState(null)
	const [loading, setLoading] = useState(false)

	const baseRule = {
		required: { value: true, message: t('Field is required') },
	}

	const validationEmail = {
		validate: {
			matchingField: (value) => value === getValues('email') || t('Emails must be the same.'),
		},
	}
	const validationPassword = {
		validate: {
			matchingField: (value) => value === getValues('password') || 'Passwords must be the same.',
		},
	}

	const onSubmit = async (data) => {
		if (!isValid) {
			return
		}
		setLoading(true)

		const response = await dispatch<any>(create(data))

		if (response.payload) {
			await dispatch<any>(login({ username: response.payload.username, password: response.payload.password }))
			navigate('/home')
		}

		if (response.error) {
			setApiError(response.error)
		}

		setLoading(false)
	}

	return (
		<div className="flex flex-col gap-y-5 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[40px] font-semibold text-cyan-950">{t('Hi, Welcome back!')}</span>
				<span className="text-[15px] text-gray-300">{t('Start connecting in our sport community right away!')}</span>
			</div>
			{(!isEmpty(errors) || !!apiError) && (
				<div className="rounded-sm border-[1px] w-full text-center p-2 border-error text-red-900 bg-red-200 text-[15px]">
					{Object.values(errors).map((error) => (
						<p>{String(error?.message)}</p>
					))}
					{apiError && <p>{apiError}</p>}
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1 w-full">
				<Controller
					name="username"
					control={control}
					rules={{
						...baseRule,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextField
							type="text"
							autofocus
							label={t('Username')}
							placeholder={t('Enter username')}
							startContent={<BiUser size={20} />}
							error={error}
							fullWidth
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="fullName"
					control={control}
					rules={{
						...baseRule,
						pattern: FULL_NAME_REGEX,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextField
							type="text"
							autofocus
							label={t('Full name')}
							placeholder={t('Enter your full name')}
							startContent={<BiUser size={20} />}
							error={error}
							fullWidth
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					rules={{
						...baseRule,
						pattern: EMAIL_REGEX,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextField
							label={t('Email')}
							placeholder={t('Enter email')}
							startContent={<MdOutlineAlternateEmail size={20} />}
							error={error}
							fullWidth
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="phone"
					control={control}
					rules={{
						...baseRule,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextField
							label={t('Phone number')}
							placeholder={t('Enter phone')}
							startContent={<AiFillPhone size={20} />}
							error={error}
							fullWidth
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{
						...baseRule,
						pattern: PASSWORD_REGEX,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextField
							label={t('Password')}
							placeholder={t('Enter password')}
							startContent={<BiLockAlt size={20} />}
							error={error}
							fullWidth
							isPassword
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="confirmPassword"
					control={control}
					rules={{
						...baseRule,
						...validationPassword,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextField
							label={t('Confirm password')}
							placeholder={t('Confirm password')}
							startContent={<BiLockAlt size={20} />}
							error={error}
							fullWidth
							isPassword
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="agreement"
					control={control}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<Checkbox label={t('I agree to the terms of service and privacy policy.')} dense {...field} />
					)}
				/>
				<Button
					type="submit"
					className="rounded-md bg-primary text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				>
					{t('Sign up')}
				</Button>
			</form>
		</div>
	)
}

export default SignUpForm
