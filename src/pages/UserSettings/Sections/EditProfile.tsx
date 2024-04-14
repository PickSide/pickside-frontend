import { BottomDrawer, EmailField, TextAreaField } from '@components'
import { Controller, useForm } from 'react-hook-form'

import { AppState } from '@state'
import getDirtyFieldsValues from '../utils/getDirtyFieldsValues'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const EditProfile = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()
	const me = useSelector((state: AppState) => state.user)

	const { control, formState, handleSubmit, reset } = useForm({
		defaultValues: {
			email: me?.email,
			bio: me?.bio,
			preferredRegion: me?.preferredRegion,
		},
		mode: 'onChange',
		resetOptions: {
			keepDirtyValues: true,
		},
	})

	const onSubmit = async (values) => {
		const changes = getDirtyFieldsValues(values, formState)

		updateUser(changes)
	}

	useEffect(() => {
		reset({
			email: me?.email,
			bio: me?.bio,
			preferredRegion: me?.preferredRegion,
		})
	}, [me, reset])

	return (
		<div className="relative h-full">
			<div className="flex w-[600px] flex-col gap-y-4">
				<p className="text-2xl font-semibold">{t('Edit profile')}</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						render={({ field }) => <EmailField {...field} label={t('Email')} fullWidth />}
					/>
					<Controller
						name="bio"
						control={control}
						render={({ field }) => <TextAreaField {...field} label={t('Bio')} fullWidth />}
					/>
					<BottomDrawer formState={formState} onReset={reset} />
				</form>
			</div>
		</div>
	)
}

export default EditProfile
