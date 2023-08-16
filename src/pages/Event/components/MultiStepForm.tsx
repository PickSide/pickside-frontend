import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { Button } from '@components'
import React from 'react'
import Step1 from './Forms/Step1'
import Step2 from './Forms/Step2'
import Step3 from './Forms/Step3'
import Step4 from './Forms/Step4'
import { Stepper } from './shared/Stepper'
import { TFunction } from 'i18next'
import { useStepper } from '../hooks'

interface MultiStepFormProps {
	onSubmit: SubmitHandler<any>
	form: UseFormReturn<any>
	t: TFunction
}

const MultiStepForm = ({ onSubmit, form, t }: MultiStepFormProps) => {
	const { previous, next } = useStepper()

	const Header = ({ children }) => <h1 className="font-semibold text-[20px] text-center">{children}</h1>

	const StepperCTAWrapper = ({ children }) => <div className="flex justify-between">{children}</div>

	return (
		<form className="flex-1 py-8 lg:px-8 lg:w-[70%] w-[80%] mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
			<Stepper>
				<Stepper.Steps>
					<Stepper.Step order={1} title={t('Time & address')}>
						<Header>{t('Set your time and location')}</Header>
						<Step1 {...form} t={t} />
						<StepperCTAWrapper>
							<Button variant="secondary" type="button" disabled onClick={previous}>
								{t('Previous')}
							</Button>
							<Button type="button" onClick={next}>
								{t('Continue')}
							</Button>
						</StepperCTAWrapper>
					</Stepper.Step>
					<Stepper.Step order={2} title={t('Price')}>
						<Header>{t('Tell us more about your event')}</Header>
						<Step2 {...form} t={t} />
						<StepperCTAWrapper>
							<Button variant="secondary" type="button" onClick={previous}>
								{t('Previous')}
							</Button>
							<Button type="button" onClick={next}>
								{t('Continue')}
							</Button>
						</StepperCTAWrapper>
					</Stepper.Step>
					<Stepper.Step order={3} title={t('Rules')}>
						<Header>{t('Set rules for your event')}</Header>
						<Step3 {...form} t={t} />
						<StepperCTAWrapper>
							<Button variant="secondary" type="button" onClick={previous}>
								{t('Previous')}
							</Button>
							<Button type="button" onClick={next}>
								{t('Continue')}
							</Button>
						</StepperCTAWrapper>
					</Stepper.Step>
					<Stepper.Step order={4} title={t('Post')}>
						<Header>{t('Choose a title and image for your event')}</Header>
						<Step4 {...form} t={t} />
						<StepperCTAWrapper>
							<Button variant="secondary" type="button" onClick={previous}>
								{t('Previous')}
							</Button>
							<Button type="submit" disabled={!form.formState.isDirty}>
								{t('Post')}
							</Button>
						</StepperCTAWrapper>
					</Stepper.Step>
				</Stepper.Steps>
			</Stepper>
		</form>
	)
}

export default MultiStepForm
