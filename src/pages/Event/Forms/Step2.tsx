import { FormDivider, NumberField, Select } from 'components'

import { AppState } from 'state'
import { Controller } from 'react-hook-form'
import { TFunction } from 'i18next'
import { useSelector } from 'react-redux'

interface FormProps {
	form: any
	t: TFunction
}

const Step2 = ({ form, t }: FormProps) => {
	const sports = useSelector((state: AppState) => state.sports)

	return (
		<div className="flex flex-col">
			<Controller
				name="sport"
				control={form.control}
				render={({ field }) => (
					<Select
						label={t('Sport')}
						placeholder={t('Select sport')}
						options={sports?.results}
						getOptionLabel={(option) => option?.name}
						isOptionDisabled={(option) => !option?.featureAvailable}
						onChange={(value) => form.setValue('sport', value)}
						defaultValue={sports?.results?.find((sport) => sport.featureAvailable) || ''}
					/>
				)}
			/>
			<FormDivider />
			{form.watch('sport') && (
				<>
					<Controller
						name="mode"
						control={form.control}
						render={({ field }) => (
							<Select
								label={t('Mode')}
								placeholder={t('Select mode')}
								options={form.getValues('sport.modes')}
								getOptionLabel={(option) => option?.name}
								onChange={(value) => form.setValue('mode', value)}
								defaultValue=""
							/>
						)}
					/>
					<FormDivider />
				</>
			)}
			<Controller
				name="price"
				control={form.control}
				render={({ field }) => (
					<NumberField label={t('Price')} onChange={(e) => form.setValue('price', e.target.value)} fullWidth />
				)}
			/>
			<FormDivider />
			<Controller
				name="maxPlayers"
				control={form.control}
				render={({ field }) => (
					<NumberField
						label={t('Number of players')}
						onChange={(e) => form.setValue('maxPlayers', e.target.value)}
						fullWidth
					/>
				)}
			/>
		</div>
	)
}

export default Step2
