import { SubmitHandler, useFormContext } from 'react-hook-form'

import Step1 from './Forms/Step1'
import Step2 from './Forms/Step2'
import Step3 from './Forms/Step3'
import { Stepper } from './shared/Stepper'
import { useTranslation } from 'react-i18next'

interface MultiStepFormProps {
	onSubmit: SubmitHandler<any>
}

const MultiStepForm = ({ onSubmit }: MultiStepFormProps) => {
	const { handleSubmit } = useFormContext<any>()
	const { t } = useTranslation()

	return (
		<form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
			<div className='max-w-[512px] mx-auto px-6'>
				<Stepper>
					<Stepper.Steps>
						<Stepper.Step order={1} title={t('Time and Location')}>
							<Step1 />
						</Stepper.Step>
						<Stepper.Step order={2} title={t('Price and Rules')}>
							<Step2 />
						</Stepper.Step>
						<Stepper.Step order={3} title={t('Submit')}>
							<Step3 />
						</Stepper.Step>
					</Stepper.Steps>
				</Stepper>
			</div>
		</form >
	)
}

export default MultiStepForm
