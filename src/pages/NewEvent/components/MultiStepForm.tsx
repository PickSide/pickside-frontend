import { SubmitHandler, useFormContext } from 'react-hook-form'

import Step1 from './Forms/Step1'
import Step2 from './Forms/Step2'
import Step3 from './Forms/Step3'
import Step4 from './Forms/Step4'
import { Stepper } from './shared/Stepper'
import { useTranslation } from 'react-i18next'

interface MultiStepFormProps {
	onSubmit: SubmitHandler<any>
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps) => {
	const { handleSubmit } = useFormContext<any>()
	const { t } = useTranslation()

	const Header = ({ children }) => <p className="font-semibold text-lg text-center mt-3 mb-2">{children}</p>

	return (
		<form className="flex-1 lg:w-[1000px] mx-auto mt-12" onSubmit={handleSubmit(onSubmit)}>
			<Stepper>
				<Stepper.Steps>
					<Stepper.Step order={1} title={t('Time & address')}>
						<Header>{t('Set your time and location')}</Header>
						<Step1 />
					</Stepper.Step>
					<Stepper.Step order={2} title={t('Price')}>
						<Header>{t('Tell us more about your event')}</Header>
						<Step2 />
					</Stepper.Step>
					<Stepper.Step order={3} title={t('Rules')}>
						<Header>{t('Set rules for your event')}</Header>
						<Step3 />
					</Stepper.Step>
					<Stepper.Step order={4} title={t('Post')}>
						<Header>{t('Choose a title and image for your event')}</Header>
						<Step4 />
					</Stepper.Step>
				</Stepper.Steps>
			</Stepper>
		</form>
	)
}

export default MultiStepForm
