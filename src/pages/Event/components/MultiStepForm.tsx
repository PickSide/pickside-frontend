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

	const Header = ({ children }) => <h1 className="font-semibold text-[20px] text-center">{children}</h1>
	console.log(onSubmit)
	return (
		<form className="flex-1 py-8 lg:px-8 lg:w-[70%] w-[80%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
