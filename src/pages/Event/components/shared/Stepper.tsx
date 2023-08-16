import React, { Fragment } from 'react'
import { useStepper } from '../../hooks'
import { StepperStep, StepperSteps } from './StepperSteps'
import { cn } from 'utils'

export const Stepper = ({ children }) => {
	const { currentStep, steps } = useStepper()

	return (
		<StepperWrapper>
			<div className="w-full flex items-center lg:p-2">
				{steps.length
					? steps.map((step, idx) => (
							<Fragment key={idx}>
								<div
									className={cn(
										'relative rounded-full w-7 h-7 lg:w-8 lg:h-8 text-[#68737D] ',
										currentStep === idx ? 'bg-[#ADCCE4]' : 'bg-[#E9EBED]',
									)}
								>
									<span className="absolute text-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
										{step.order}
									</span>
									<span className="hidden lg:block lg:absolute whitespace-nowrap -translate-x-1/2 left-1/2 -translate-y-full">
										{step.title}
									</span>
								</div>
								{idx !== steps.length - 1 && <hr className="flex-grow-2 border-t-2 border-solid" />}
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

const StepperWrapper = ({ children }) => (
	<div className="w-full h-full flex flex-col justify-between lg:pt-8 lg:px-10 bg-white text-[#323B45]">{children}</div>
)

export const StepperBodyWrapper = ({ children }) => (
	<div className="flex flex-col h-full justify-between w-full lg:w-fit mx-auto">{children}</div>
)
