import { AppState } from '@state'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const PersonalInfo = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()

	const connectedUser = useSelector((state: AppState) => state.user)

	const {
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			email: connectedUser?.email,
			preferredLocale: connectedUser?.preferredLocale,
			timezone: connectedUser?.timezone,
		},
		resetOptions: {
			keepDefaultValues: true,
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
