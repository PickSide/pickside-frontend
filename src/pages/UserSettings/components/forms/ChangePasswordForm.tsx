import { Alert, Button, PasswordField } from '@components'
import { Controller, useForm } from 'react-hook-form'

import useChangePassword from '@pages/UserSettings/hooks/services/useChangePassword'
import { useTranslation } from 'react-i18next'

interface ChangePasswordFormProps {
	currentPassword?: string
	newPassword?: string
	confirmNewPassword?: string
}

const ChangePasswordForm = ({ onClose }) => {
	const { changePassword, isError, isLoading, error } = useChangePassword()
	const { t } = useTranslation()
	const {
		control,
		handleSubmit,
		formState: { isValid },
		watch,
	} = useForm<ChangePasswordFormProps>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		reValidateMode: 'onChange',
	})

	const onSubmit = (values) => {
		changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword })
	}

	return (
		<form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
			{isError && (
				<Alert className="w-full" icon="password" severity="error">
					{error?.response?.data.msg}
				</Alert>
			)}
			<Controller
				name="currentPassword"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<PasswordField
						{...field}
						autoFocus
						label={t('Current password')}
						placeholder={t('Type your current password')}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="newPassword"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<PasswordField {...field} label={t('New password')} placeholder={t('Type your new password')} fullWidth />
				)}
			/>
			<Controller
				name="confirmNewPassword"
				control={control}
				rules={{
					required: true,
					validate: (val) => {
						if (watch('newPassword') != val) {
							return t('Passwords do no match')
						}
					},
				}}
				render={({ field }) => (
					<PasswordField
						{...field}
						label={t('Confirm new password')}
						placeholder={t('Confirm your current password')}
						fullWidth
					/>
				)}
			/>
			<div className="flex items-center justify-around">
				<Button type="button" variant="tertiary" onClick={onClose}>
					{t('Cancel')}
				</Button>
				<Button isLoading={isLoading} type="submit" disabled={!isValid}>
					{t('Submit')}{' '}
				</Button>
			</div>
		</form>
	)
}

export default ChangePasswordForm
