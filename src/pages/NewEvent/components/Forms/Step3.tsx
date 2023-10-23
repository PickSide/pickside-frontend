import { Button, FormDivider, Switch, TextAreaField } from '@components'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import StepperCTAWrapper from '../shared/StepperCTAWrapper'
import { useDevice } from '@hooks'
import { useStepper } from '@pages/NewEvent/hooks/useStepper'
import { useTranslation } from 'react-i18next'

const Step3 = () => {
	const [device] = useDevice()
	const { control } = useFormContext<any>()
	const { dirtyFields } = useFormState()
	const { previous, next } = useStepper()
	const { t } = useTranslation()

	return (
		<>
			<Controller
				name="isPrivate"
				control={control}
				render={({ field }) => <Switch {...field} label={t('Is your event private')} />}
			/>

			<FormDivider />

			<Controller
				name="rules"
				control={control}
				render={({ field }) => (
					<TextAreaField
						{...field}
						fullWidth
						label={t('Rules')}
						placeholder={t('Let your teammates know wht you expect of them ...')}
						rows={device === 'mobile' ? '10' : '8'}
					/>
				)}
			/>
			<StepperCTAWrapper>
				<Button variant="secondary" type="button" onClick={previous}>
					{t('Previous')}
				</Button>
				<Button type="button" onClick={next} disabled={!dirtyFields['rules']}>
					{t('Continue')}
				</Button>
			</StepperCTAWrapper>
		</>
	)
}

export default Step3
