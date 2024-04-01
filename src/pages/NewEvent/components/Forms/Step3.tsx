import { Button, FormDivider, InputField } from '@components'
import { Controller, useFormContext, useFormState } from 'react-hook-form'

import ImageUploader from '../ImageUploader'
import StepperCTAWrapper from '../shared/StepperCTAWrapper'
import { useStepper } from '@pages/NewEvent/hooks/useStepper'
import { useTranslation } from 'react-i18next'

const Step3 = () => {
	const { control, setValue } = useFormContext<any>()
	const { dirtyFields } = useFormState()
	const { previous } = useStepper()
	const { t } = useTranslation()

	return (
		<>
			<Controller
				name="title"
				control={control}
				render={({ field }) => <InputField {...field} fullWidth label={t('Title')} placeholder={t('Type your title')} />}
			/>
			<FormDivider />
			<ImageUploader onChange={(value) => setValue('images', value)} />
			<StepperCTAWrapper>
				<Button variant="tertiary" type="button" onClick={previous}>
					{t('Previous')}
				</Button>
				<Button type="submit" disabled={!dirtyFields['title']}>
					{t('Post')}
				</Button>
			</StepperCTAWrapper>
		</>
	)
}

export default Step3
