import { forwardRef, useState } from 'react'
import { useDevice, useMultistepForm } from 'hooks'

import { BiCheck } from 'react-icons/bi'
import { Button } from 'components'
import { StepConfiguration } from 'types'
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
	const isMobile = useDevice()
	const { activeStep, isStepActive, isFirstStep, isLastStep, isStepCompleted, handlePreviousStep, handleNextStep } =
		useMultistepForm(steps.map((x) => x.content))

	const [slide, setSlide] = useState<'right' | 'left' | 'none'>('none')

	const StepperMobile = () => (
		<div className="rounded-md relative w-full flex py-8 px-10 bg-white gap-y-8 text-[#323B45]">
			{/* <div className="w-full p-2 m-auto">
				{steps.map((step, idx) => (
					<div key={idx} className={` flex ${idx !== steps.length - 1 ? 'flex-grow' : 'flex-shrink'}`}>
						<div
							className={`relative rounded-full w-5 h-5 border-2 bg-none ease-in-out transition-all duration-75
							${
								isStepActive(idx)
									? 'border-primary'
									: isStepCompleted(idx)
									? 'border-primary bg-primary'
									: 'border-[#E3E1E8] bg-none'
							}`}
						>
							<span
								className={`absolute w-fit -translate-x-1/2 left-1/2 -top-7 mx-auto ${
									isStepActive(idx) ? 'text-primary font-semibold' : 'text-[#cdcbd1]'
								} ease-in-out transition-all duration-75`}
							>
								{step.title}
							</span>
						</div>
						{idx !== steps.length - 1 && (
							<div
								className={`flex-1 border-t-2 border-solid mt-2 ease-in-out transition-all duration-75 ${
									isStepCompleted(idx) ? 'border-primary' : 'border-[#E3E1E8]'
								}`}
							></div>
						)}
					</div>
				))}
			</div> */}
		</div>
	)

	const StepperScreen = () => (
		<div className="relative w-full h-full flex flex-col py-8 px-10 bg-white gap-y-8 text-[#323B45] overflow-x-hidden">
			<div className="w-full flex p-2">
				{steps.map((step, idx) => (
					<div key={idx} className={` flex items-center ${idx !== steps.length - 1 ? 'flex-grow' : 'flex-shrink'}`}>
						<div
							className={`relative rounded-full w-8 h-8 border-2 bg-none ease-in-out transition-all duration-75
							${
								isStepActive(idx)
									? 'border-primary'
									: isStepCompleted(idx)
									? 'border-primary bg-primary'
									: 'border-[#E3E1E8] bg-none'
							}`}
						>
							{/* STEP CHECKMARK COMPLETETION */}
							{isStepCompleted(idx) && (
								<span className="absolute text-white left-1/2 -translate-x-1/2">
									<BiCheck size={25} />
								</span>
							)}
							{/* STEP TITLE */}
							<span
								className={`absolute whitespace-nowrap -translate-x-1/2 left-1/2 -top-12 mx-auto ${
									isStepActive(idx) ? 'text-primary font-semibold' : 'text-[#cdcbd1]'
								} ease-in-out transition-all duration-75`}
							>
								{step.title}
							</span>
						</div>
						{/* STEP DIVIDER*/}
						{idx !== steps.length - 1 && (
							<hr
								className={`block w-[80%] mx-auto border-t-2 border-solid ease-in-out transition-all duration-75 ${
									isStepCompleted(idx) ? 'border-primary' : 'border-[#E3E1E8]'
								}`}
							/>
						)}
					</div>
				))}
			</div>
			<div className="flex flex-col h-full justify-between w-fit mx-auto">
				{/* STEPPER TITLE */}
				<div className="flex flex-col justify-between py-6 mx-auto">
					<p className="text-[30px] font-semibold text-gray-800">{steps[activeStep].description}</p>
				</div>

				{/* STEPPER CONTENT */}
				<div className="flex flex-col grow-[2] py-6">{steps[activeStep].content}</div>

				{/* STEPPER BUTTONS */}
				<div className="flex justify-between">
					<Button
						variant="secondary"
						disabled={isFirstStep}
						type="button"
						text={t(previousText)}
						onClick={() => {
							setSlide('right')
							handlePreviousStep()
						}}
					/>
					{isLastStep ? (
						<Button
							//disabled={submitDisabled}
							type="submit"
							text={submitText}
						/>
					) : (
						<Button
							onClick={() => {
								setSlide('right')
								handleNextStep()
							}}
							type="button"
							text={nextText}
						/>
					)}
				</div>
			</div>
		</div>
	)

	return <StepperScreen />
}

export default forwardRef(Stepper)
