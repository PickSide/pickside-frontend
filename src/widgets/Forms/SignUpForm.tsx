import { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, TextFieldV2 } from 'components'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useAuth, useCalls } from 'hooks'
import { BiLockAlt, BiUser } from 'react-icons/bi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { omit } from 'lodash'
import { EMAIL_REGEX, PASSWORD_REGEX, FULL_NAME_REGEX } from 'utils/constants'
import { useNavigate } from 'react-router'

interface SignUpFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	firstName: string
	lastName: string
	email: string
	confirmEmail: string
	password: string
	confirmPassword: string
	sexe: 'male' | 'female' | undefined
}

const SignUpForm: FC<SignUpFormProps> = ({ onClose }) => {
	const { login } = useAuth()
	const { postItem } = useCalls()
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
			//confirmEmail: '',
			password: '',
			confirmPassword: '',
			//sexe: undefined,
		},
	})

	const [apiMessage, setApiMessage] = useState(null)

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

		const { username, password, message, status } = await dispatch<any>(
			postItem({
				endpoint: 'account/create',
				data: omit(data, ['confirmEmail', 'confirmPassword']),
			}),
		)

		if (username && status === 200) {
			await dispatch<any>(login({ username, password }))
			navigate('/')
		} else {
			setApiMessage(message)
		}
	}
	const onError = (error) => console.log(error)

	return (
		<div className="flex flex-col gap-y-20 items-center">
			<div className="flex flex-col items-center">
				<span className="text-[50px]">{t('Welcome back')}</span>
				<span className="text-[15px]">{t('Welcome back! Please enter your details')}</span>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
				<Controller
					name="username"
					control={control}
					rules={{
						...baseRule,
					}}
					render={({ field, fieldState: { error }, formState }) => (
						<TextFieldV2
							type="text"
							autofocus
							label={t('Username')}
							placeholder={t('Enter username')}
							startContent={<BiUser size={20} />}
							error={error}
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
						<TextFieldV2
							type="text"
							autofocus
							label={t('Full name')}
							placeholder={t('Enter your full name')}
							startContent={<BiUser size={20} />}
							error={error}
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
						<TextFieldV2
							label={t('Email')}
							placeholder={t('Enter email')}
							startContent={<MdOutlineAlternateEmail size={20} />}
							error={error}
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
						<TextFieldV2
							label={t('Password')}
							placeholder={t('Enter password')}
							startContent={<BiLockAlt size={20} />}
							error={error}
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
						<TextFieldV2
							label={t('Confirm password')}
							placeholder={t('Confirm password')}
							startContent={<BiLockAlt size={20} />}
							error={error}
							isPassword
							dense
							{...field}
						/>
					)}
				/>
				<Button
					type="submit"
					className="rounded-md bg-primary w-[300px] text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				>
					{t('Sign up')}
				</Button>
			</form>
		</div>
	)
}

export default SignUpForm
