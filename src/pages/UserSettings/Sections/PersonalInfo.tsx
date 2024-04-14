import { AppState } from '@state'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const PersonalInfo = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()

	const me = useSelector((state: AppState) => state.user)

	const {
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			preferredLocale: me?.preferredLocale,
			timezone: me?.timezone,
		},
		resetOptions: {
			keepDefaultValues: true,
		},
	})

	const onSubmit = async (values) => {
		const keys = Object.keys(dirtyFields)
		const changes = {}

		keys.forEach((key) => (changes[key] = values[key]))

		updateUser({ ...changes })
	}

	return (
		<div className="relative h-full">
			<form className="flex w-[600px] flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-semibold">{t('Personal info')}</p>
			</form>
		</div>
	)
}

export default PersonalInfo
