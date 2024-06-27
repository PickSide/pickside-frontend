import { StepperStep, StepperSteps } from './StepperSteps'

import { Fragment } from 'react'
import { cn } from '@utils'
import { useStepper } from '../../hooks/useStepper'

export const Stepper = ({ children }) => {
	const { currentStep, steps } = useStepper()
	console.log(steps)
	return (
		<StepperWrapper>
			<p className="lg:hidden w-full text-center text-lg font-medium mb-8">
				{steps.length && steps[currentStep].title}
			</p>
			<div className="flex items-center lg:p-2 mb-8">
				{steps.length
					? steps.map((step, idx) => (
							<Fragment key={idx}>
								<div
									className={cn(
										'relative rounded-full w-7 h-7 lg:w-8 lg:h-8 text-charcoal-black',
										currentStep === idx ? 'bg-ocean-2' : 'bg-cool-gray-2',
									)}
								>
									<span className="absolute text-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
										{step.order}
									</span>
									<span className="hidden lg:block lg:absolute whitespace-nowrap -translate-x-1/2 left-1/2 -translate-y-full">
										{step.title}
									</span>
								</div>
								{idx !== steps.length - 1 && <hr className="flex-grow-2 border-t-2 border-solid mx-5" />}
							</Fragment>
						))
					: null}
			</div>
			<StepperBodyWrapper>{children}</StepperBodyWrapper>
		</StepperWrapper>
	)
}

Stepper.Step = StepperStep
Stepper.Steps = StepperSteps

const StepperWrapper = ({ children }) => <div className="max-w-xl h-full text-charcoal-black m-auto px-10 mt-20">{children}</div>

export const StepperBodyWrapper = ({ children }) => children
