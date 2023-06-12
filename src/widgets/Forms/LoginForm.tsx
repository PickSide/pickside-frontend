import { FC, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox, TextField } from 'components'
import { useAuth, useLocalStorage } from 'hooks'
import { BiLockAlt, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

interface LoginFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	password: string
	remeberMe: boolean
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
	const { login } = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { set: setLocalStorage } = useLocalStorage()
	const { t } = useTranslation()
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

	const onSubmit = async (values: any) => {
		setLoading(true)
		await dispatch<any>(login(values))
		setLoading(false)
		navigate('/home')
	}

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
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<TextField
							type="text"
							autofocus
							label={t('Username')}
							placeholder={t('Enter username')}
							startContent={<BiUser size={20} />}
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
					}}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<TextField
							autofocus
							label={t('Password')}
							placeholder={t('Enter password')}
							startContent={<BiLockAlt size={20} />}
							isPassword
							fullWidth
							dense
							{...field}
						/>
					)}
				/>
				<Controller
					name="remeberMe"
					control={control}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<Checkbox label={t('Remember me')} dense {...field} />
					)}
				/>
				<Button
					type="submit"
					isLoading={loading}
					className="rounded-md bg-primary w-[300px] text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				>
					{t('Login')}
				</Button>
			</form>
			<div className="flex gap-x-2">
				<span>{t(`Don't have an account?`)}</span>
				<Link to="/signup" className="font-semibold text-primary">
					{t('Sign in')}
				</Link>
			</div>
		</div>
	)
}

export default LoginForm
