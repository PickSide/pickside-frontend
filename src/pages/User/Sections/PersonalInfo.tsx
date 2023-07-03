import { Button, Select, TextField } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import { useApi } from 'hooks'
import { useTranslation } from 'react-i18next'

const PersonalInfo = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { updateUser } = useApi()

	const connectedUser = useSelector((state: AppState) => state.user)
	const locales = useSelector((state: AppState) => state.locales)
	//const connectedUser = useSelector((state: AppState) => state.timezones)

	const {
		control,
		handleSubmit,
		formState: { isDirty, dirtyFields },
		register,
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			email: connectedUser?.email,
			preferredLocale: connectedUser?.preferredLocale,
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
				<TextField label={t('Email')} fullWidth {...register('email')} />
				<Controller
					name="preferredLocale"
					control={control}
					defaultValue={connectedUser?.preferredLocale}
					render={({ field: { value } }) => (
						<Select
							label={t('Language')}
							defaultValue={value}
							placeholder={t('Select language')}
							options={locales?.results}
							getOptionLabel={(option) => option?.description}
							getOptionValue={(option) => option?.value || ''}
							onChange={(option) =>
								setValue('preferredLocale', option.id, { shouldDirty: option.value !== value?.value })
							}
						/>
					)}
				/>
				<div className="absolute bottom-0 inline-flex gap-x-3">
					<Button type="reset" variant="tertiary" text={t('Reset')} disabled={!isDirty} />
					<Button type="submit" text={t('Save changes')} disabled={!isDirty} />
				</div>
			</form>
		</div>
	)
}

export default PersonalInfo
