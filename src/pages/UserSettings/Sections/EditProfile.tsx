import { AppState, Area } from '@state'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField, Select, TextAreaField } from '@components'

import { orderBy } from 'lodash'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const EditProfile = () => {
	const { t } = useTranslation()
	const { control } = useFormContext()

	const areas = useSelector((state: AppState) => state.areas)
	const connectedUser = useSelector((state: AppState) => state.user)

	return (
		<div className="relative h-full">
			<div className="flex flex-col gap-y-4 w-[600px]">
				<p className="text-2xl font-semibold">{t('Edit profile')}</p>

				{!connectedUser?.isExternalAccount && (
					<Controller
						name="username"
						control={control}
						render={({ field }) => <InputField label={t('Username')} fullWidth {...field} />}
					/>
				)}

				<Controller
					name="bio"
					control={control}
					render={({ field }) => <TextAreaField label={t('Bio')} fullWidth {...field} />}
				/>

				<Controller
					name="preferredRegion"
					control={control}
					render={({ field }) => (
						<Select
							label={t('Preferred Region')}
							placeholder={t('Select region')}
							options={orderBy<Area>(areas?.results, ['city', 'country', '@state'], ['asc', 'desc'])}
							getOptionLabel={(option) => option?.district?.join(' / ') || ''}
							getOptionValue={(option) => option?.id || ''}
							{...field}
						/>
					)}
				/>
			</div>
		</div>
	)
}

export default EditProfile
