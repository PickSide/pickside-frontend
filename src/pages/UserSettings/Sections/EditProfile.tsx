import { BottomDrawer, InputField, TextAreaField } from '@components'
import { Controller, useForm } from 'react-hook-form'

import { AppState } from '@state'
import getDirtyFieldsValues from '../utils/getDirtyFieldsValues'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const EditProfile = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()
	const connectedUser = useSelector((state: AppState) => state.user)

	const { control, formState, handleSubmit, reset } = useForm({
		defaultValues: {
			username: connectedUser?.username,
			bio: connectedUser?.bio,
			preferredRegion: connectedUser?.preferredRegion,
		},
		resetOptions: {
			keepDefaultValues: true,
		},
	})

	const onSubmit = async (values) => {
		const changes = getDirtyFieldsValues(values, formState)
		await updateUser(changes)
		reset()
	}

	return (
		<div className="relative h-full">
			<div className="flex flex-col gap-y-4 w-[600px]">
				<p className="text-2xl font-semibold">{t('Edit profile')}</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="username"
						control={control}
						render={({ field }) => <InputField label={t('Username')} fullWidth {...field} />}
					/>

					<Controller
						name="bio"
						control={control}
						render={({ field }) => <TextAreaField label={t('Bio')} fullWidth {...field} />}
					/>
					<BottomDrawer show={formState.isDirty} onReset={reset} />
				</form>
			</div>
		</div>
	)
}

export default EditProfile
