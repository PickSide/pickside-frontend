import { Controller, useForm } from 'react-hook-form'

import { AppState } from '@state'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const PersonalInfo = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()

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

		await updateUser({ ...changes })
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
