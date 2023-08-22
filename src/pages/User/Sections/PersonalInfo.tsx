import { Button, Select, TextField } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '@state'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useApi } from '@hooks'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PersonalInfo = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { updateUser } = useApi()

	const connectedUser = useSelector((state: AppState) => state.user)

	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)

	const {
		control,
		handleSubmit,
		formState: { isDirty, dirtyFields },
		register,
		setValue,
	} = useForm({
		defaultValues: {
			email: connectedUser?.email,
			preferredLocale: connectedUser?.preferredLocale,
			timezone: connectedUser?.timezone,
		},
	})

	const onSubmit = async (values) => {
		const keys = Object.keys(dirtyFields)
		const changes = {}

		keys.forEach((key) => (changes[key] = values[key]))

		await dispatch<any>(updateUser({ ...changes }))
	}

	return (
		<div className="relative h-full">
			<form className="flex flex-col gap-y-4 w-[600px]" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-semibold">{t('Personal info')}</p>
			</form>
		</div>
	)
}

export default PersonalInfo
