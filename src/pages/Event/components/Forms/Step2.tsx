import { FormDivider, NumberField, Select } from 'components'

import { AppState } from 'state'
import { Controller } from 'react-hook-form'
import { TFunction } from 'i18next'
import { useSelector } from 'react-redux'

const Step2 = ({ register, getValues, setValue, watch, t }) => {
	const sports = useSelector((state: AppState) => state.sports)

	return (
		<>
			<Select
				label={t('Sport')}
				placeholder={t('Select sport')}
				options={sports?.results}
				getOptionLabel={(option) => option?.name}
				isOptionDisabled={(option) => !option?.featureAvailable}
				{...register('sport')}
				onChange={(value) => setValue('sport', value)}
			/>
			<FormDivider />
			{watch('sport') && (
				<>
					<Select
						label={t('Mode')}
						placeholder={t('Select mode')}
						options={getValues('sport.modes')}
						getOptionLabel={(option) => option?.name}
						onChange={(value) => setValue('mode', value)}
					/>
					<FormDivider />
				</>
			)}
			<NumberField label={t('Price')} onChange={(e) => setValue('price', e.target.value)} fullWidth />
			<FormDivider />
			<NumberField
				fullWidth
				label={t('Number of players')}
				{...register('maxPlayers')}
				onChange={(e) => setValue('maxPlayers', e.target.value)}
			/>
		</>
	)
}

export default Step2
