import { Button, Dialog, Select, TextField } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { useApi } from 'hooks'
import { useTranslation } from 'react-i18next'

const ChangePasswordForm = ({ onClose }) => {
	const { t } = useTranslation()
	const {
		control,
		handleSubmit,
		formState: { isDirty, dirtyFields },
		register,
		setValue,
	} = useForm({})

	const onSubmit = (values) => {}

	return (
		<form className="flex flex-col space-y-8" onSubmit={handleSubmit(onSubmit)}>
			<TextField label={t('Email')} fullWidth {...register('email')} />
			<TextField label={t('Email')} fullWidth {...register('email')} />
			<TextField label={t('Email')} fullWidth {...register('email')} />
			<Button variant="tertiary" onClick={onClose}>
				{t('Cancel')}
			</Button>
			<Button type="submit">{t('Submit')} </Button>
		</form>
	)
}

export default ChangePasswordForm
