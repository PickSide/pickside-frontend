import { Button, InputField } from '@components'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const ChangePasswordForm = ({ onClose }) => {
	const { t } = useTranslation()
	const { handleSubmit, register } = useForm({})

	const onSubmit = (values) => {}

	return (
		<form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
			<InputField label={t('Current password')} fullWidth {...register('current_password')} />
			<InputField label={t('New password')} fullWidth {...register('password')} />
			<InputField label={t('Confirm new password')} fullWidth {...register('confirm_password')} />
			<Button type="button" variant="tertiary" onClick={onClose}>
				{t('Cancel')}
			</Button>
			<Button type="submit">{t('Submit')} </Button>
		</form>
	)
}

export default ChangePasswordForm
