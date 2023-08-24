import { Button, TextField } from '@components'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const ChangePasswordForm = ({ onClose }) => {
	const { t } = useTranslation()
	const { handleSubmit, register } = useForm({})

	const onSubmit = (values) => {}

	return (
		<form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
			<TextField label={t('Email')} fullWidth {...register('email')} />
			<TextField label={t('Email')} fullWidth {...register('email')} />
			<TextField label={t('Email')} fullWidth {...register('email')} />
			<Button type="button" variant="tertiary" onClick={onClose}>
				{t('Cancel')}
			</Button>
			<Button type="submit">{t('Submit')} </Button>
		</form>
	)
}

export default ChangePasswordForm
