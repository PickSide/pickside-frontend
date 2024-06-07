import { AppState, Sport } from '@state'
import { Button, FormDivider, Icon, NumberField, Select, TextAreaField } from '@components'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { CreateEventProps } from '@pages/NewEvent/utils/types'
import StepperCTAWrapper from '../shared/StepperCTAWrapper'
import { useDevice } from '@hooks'
import { useSelector } from 'react-redux'
import { useStepper } from '@pages/NewEvent/hooks/useStepper'
import { useTranslation } from 'react-i18next'

const Step2 = () => {
	const [device] = useDevice()
	const { control, getValues, watch } = useFormContext<CreateEventProps>()
	const { dirtyFields } = useFormState({ control })
	const { previous, next } = useStepper()
	const { t } = useTranslation()

	const sportOptions = useSelector((state: AppState) => state.sports?.result || [])
	const gameModes = getValues('sport.gameModes')?.split(',').map(g => ({ value: g }))

	return (
		<>
			<div className='flex justify-between items-center gap-x-4'>
				<Controller
					name="sport"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							fullWidth
							label={t('Sport')}
							placeholder={t('Select sport')}
							options={sportOptions as Sport[]}
							formatOptionLabel={(option: Sport) => <span className='capitalize'>{option.name}</span>}
							getOptionLabel={(option: Sport) => option?.name}
							getOptionValue={(option: Sport) => option?.id.toString()}
							isOptionDisabled={(option) => !option?.featureAvailable}
						/>
					)}
				/>
				{watch('sport') && (
					<>
						<Controller
							name="gameMode"
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									fullWidth
									label={t('Mode')}
									placeholder={t('Select mode')}
									options={gameModes}
									value={gameModes.find(x => x.value === field.value)}
									getOptionLabel={(option: { value: string }) => option.value}
									onChange={(selectedOption: { value: string }) => {
										field.onChange(selectedOption.value)
									}}
								/>
							)}
						/>
						<FormDivider />
					</>
				)}
			</div>

			<FormDivider />

			<div className='flex justify-between items-center gap-x-4'>
				<Controller
					name="price"
					control={control}
					render={({ field }) => (
						<NumberField
							{...field}
							fullWidth
							label={t('Price')}
							startContent={<Icon icon="attach_money" />}
							onChange={(e) => {
								field.onChange(Number.parseFloat(e.target.value))
							}}
						/>
					)}
				/>
				<Controller
					name="maxPlayers"
					control={control}
					render={({ field }) => (
						<NumberField
							{...field}
							fullWidth
							label={t('Number of players')}
							startContent={<Icon icon="group" />}
							onChange={(e) => {
								field.onChange(Number.parseFloat(e.target.value))
							}}
						/>
					)}
				/>
			</div>
			<FormDivider />

			<Controller
				name="rules"
				control={control}
				render={({ field }) => (
					<TextAreaField
						{...field}
						fullWidth
						label={t('Rules')}
						placeholder={t('Let your teammates know what you expect of them ...')}
						rows={device === 'mobile' ? 10 : 8}
					/>
				)}
			/>

			<StepperCTAWrapper>
				<Button variant="tertiary" type="button" onClick={previous}>
					{t('Previous')}
				</Button>
				<Button
					type="button"
					onClick={next}
					disabled={!dirtyFields['sport'] || !dirtyFields['gameMode'] || !dirtyFields['maxPlayers']}
				>
					{t('Continue')}
				</Button>
			</StepperCTAWrapper>
		</>
	)
}

export default Step2
