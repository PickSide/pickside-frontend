import { Fragment, forwardRef } from 'react'
import { useDevice, useMultistepForm } from 'hooks'

import { BiCheck } from 'react-icons/bi'
import { Button } from 'components'
import { StepConfiguration } from 'types'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

interface StepperProps {
	steps: StepConfiguration[]
	submitDisabled?: boolean
	submitText?: string
	nextText?: string
	previousText?: string
}

const Stepper = (
	{ steps, submitDisabled, submitText = 'Submit', nextText = 'Next', previousText = 'Previous' }: StepperProps,
	ref,
) => {
	const { t } = useTranslation()
	const { isMobile } = useDevice()
	const { activeStep, isStepActive, isFirstStep, isLastStep, isStepCompleted, handlePreviousStep, handleNextStep } =
		useMultistepForm(steps.map((x) => x.content))

	const StepCircle = ({ step, idx }) => (
		<div
			className={twMerge(
				'relative rounded-full w-7 h-7 lg:w-8 lg:h-8 text-[#68737D]',
				isStepActive(idx) ? 'bg-[#ADCCE4]' : 'bg-[#E9EBED]',
			)}
		>
			<span className="absolute text-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
				{isStepCompleted(idx) ? <BiCheck size={isMobile ? 20 : 25} /> : idx + 1}
			</span>
			{!isMobile && (
				<span className={twMerge('absolute whitespace-nowrap -translate-x-1/2 left-1/2 -translate-y-full')}>
					{step.title}
				</span>
			)}
		</div>
	)

	const StepperScreen = () => (
		<div className="w-full flex flex-col lg:py-8 lg:px-10 bg-white gap-y-8 text-[#323B45] overflow-x-hidden">
			<div className="w-full flex items-center lg:p-2">
				{steps.map((step, idx) => (
					<Fragment key={idx}>
						<StepCircle step={step} idx={idx} />
						{/* STEP DIVIDER*/}
						{idx !== steps.length - 1 && <hr className={twMerge('flex-grow-2 border-t-2 border-solid')} />}
					</Fragment>
				))}
			</div>
			<div className="flex flex-col h-full justify-between w-full lg:w-fit mx-auto">
				{/* CONTENT TITLE */}
				<div className="mx-auto">
					<p className="text-[20px] lg:text-[30px] font-semibold text-gray-800">{steps[activeStep].description}</p>
				</div>

				{/* CONTENT */}
				<div className="flex flex-col py-3 lg:py-6">{steps[activeStep].content}</div>

				{/* STEPPER BUTTONS */}
				<div className="flex justify-between  py-6">
					<Button variant="secondary" disabled={isFirstStep} type="button" onClick={() => handlePreviousStep()}>
						{t(previousText)}
					</Button>
					{isLastStep ? (
						<Button
							//disabled={submitDisabled}
							type="submit"
						>
							{submitText}
						</Button>
					) : (
						<Button onClick={() => handleNextStep()} type="button">
							{nextText}
						</Button>
					)}
				</div>
			</div>
		</div>
	)

	return <StepperScreen />
}

export default forwardRef(Stepper)
