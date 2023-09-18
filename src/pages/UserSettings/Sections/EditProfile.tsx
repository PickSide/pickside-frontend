import { AppState, Area } from '@state'
import { BottomDrawer, InputField, Select, TextAreaField } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const EditProfile = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { updateUser } = useUpdateSetting()
	const areas = useSelector((state: AppState) => state.areas)
	const connectedUser = useSelector((state: AppState) => state.user)

	const {
		control,
		handleSubmit,
		formState: { isDirty, dirtyFields },
		register,
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			username: connectedUser?.username,
			bio: connectedUser?.bio,
			preferredRegion: connectedUser?.preferredRegion,
		},
	})

	const onSubmit = async (values) => {
		const keys = Object.keys(dirtyFields)
		const changes = {}

		keys.forEach((key) => (changes[key] = values[key]))

		await dispatch<any>(updateUser({ ...changes }))

		reset()
	}

	return (
		<div className="relative h-full">
			<form className="flex flex-col gap-y-4 w-[600px]" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-semibold">{t('Edit profile')}</p>
				{!connectedUser?.isExternalAccount && <InputField label={t('Username')} fullWidth {...register('username')} />}
				<TextAreaField label={t('Bio')} fullWidth {...register('bio')} />
				<Controller
					name="preferredRegion"
					control={control}
					defaultValue={connectedUser?.preferredRegion}
					render={({ field: { value } }) => (
						<Select
							label={t('Preferred Region')}
							defaultValue={value}
							placeholder={t('Select region')}
							options={orderBy<Area>(areas?.results, ['city', 'country', '@state'], ['asc', 'desc'])}
							getOptionLabel={(option) => option?.district?.join(' / ') || ''}
							getOptionValue={(option) => option?.id || ''}
							onChange={(option) => setValue('preferredRegion', option.id, { shouldDirty: option.id !== value?.id })}
						/>
					)}
				/>

				<BottomDrawer show={isDirty} onReset={reset} />
			</form>
		</div>
	)
}

export default EditProfile
