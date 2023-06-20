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
	const { t } = useTranslation()
	const [apiError, setApiError] = useState(null)
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

	const onSubmit = async (data: any) => {
		setLoading(true)

		const response = await dispatch<any>(login(data))

		if (response.error) {
			setApiError(response.error)
		} else {
			navigate('/home')
		}

		setLoading(false)
	}

	return (
		<div className="flex flex-col gap-y-10 items-center">
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
							{...field}
						/>
					)}
				/>
				<Controller
					name="remeberMe"
					control={control}
					render={({ field, fieldState: { invalid, isTouched, isDirty, error }, formState }) => (
						<Checkbox label={t('Remember me')} {...field} />
					)}
				/>
				<Button
					text={t('Login')}
					type="submit"
					isLoading={loading}
					className="rounded-md bg-primary text-white font-semibold h-[50px] transition-all duration-75 ease-in hover:bg-secondary"
				/>
			</form>
			<div className="flex gap-x-2">
				<span className="text-gray-500">{t(`Don't have an account?`)}</span>
				<Link to="/signup" className="font-semibold text-primary hover:text-gray-400/90 hover:scale-105">
					{t('Sign in')}
				</Link>
			</div>
		</div>
	)
}

export default LoginForm
