import { AppState, Mode, Sport } from '@state'
import { Button, FormDivider, Icon, NumberField, Select } from '@components'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import StepperCTAWrapper from '../shared/StepperCTAWrapper'
import { useSelector } from 'react-redux'
import { useStepper } from '@pages/NewEvent/hooks/useStepper'
import { useTranslation } from 'react-i18next'

const Step2 = () => {
	const { control, getValues, watch } = useFormContext<any>()
	const { dirtyFields } = useFormState({ control })
	const { previous, next } = useStepper()
	const { t } = useTranslation()

	const sportOptions = useSelector((state: AppState) => state.sports?.results || [])

	return (
		<>
			<Controller
				name="sport"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						label={t('Sport')}
						placeholder={t('Select sport')}
						options={sportOptions as Sport[]}
						getOptionLabel={(option) => option?.name}
						getOptionValue={(option) => option?.value}
						isOptionDisabled={(option) => !option?.featureAvailable}
					/>
				)}
			/>

			<FormDivider />

			{watch('sport') && (
				<>
					<Controller
						name="mode"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								label={t('Mode')}
								placeholder={t('Select mode')}
								options={getValues('sport.modes') as Mode[]}
								getOptionLabel={(option: Mode) => option?.name}
								getOptionValue={(option: Mode) => option?.value}
							/>
						)}
					/>
					<FormDivider />
				</>
			)}

			<Controller
				name="price"
				control={control}
				render={({ field }) => (
					<NumberField {...field} fullWidth label={t('Price')} startContent={<Icon icon="attach_money" />} />
				)}
			/>

			<FormDivider />

			<Controller
				name="maxPlayers"
				control={control}
				render={({ field }) => (
					<NumberField {...field} fullWidth label={t('Number of players')} startContent={<Icon icon="group" />} />
				)}
			/>

			<StepperCTAWrapper>
				<Button variant="secondary" type="button" onClick={previous}>
					{t('Previous')}
				</Button>
				<Button
					type="button"
					onClick={next}
					disabled={!dirtyFields['sport'] || !dirtyFields['mode'] || !dirtyFields['maxPlayers']}
				>
					{t('Continue')}
				</Button>
			</StepperCTAWrapper>
		</>
	)
}

export default Step2
