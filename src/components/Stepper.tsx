import { FC, useMemo, useState } from 'react'
import { StepConfiguration } from 'types'
import { useIsMobile } from 'hooks'

interface StepperProps {
	steps: StepConfiguration[]
}

const Stepper: FC<StepperProps> = ({ steps }) => {
	const isMobile = useIsMobile()

	const [activeStep, setActiveStep] = useState<number>(0)
	const [completedSteps, setCompletedSteps] = useState<number[]>([])

	const isStepCompleted = (idx) => completedSteps.includes(idx)
	const isStepActive = (idx) => activeStep === idx

	const isFirstStep = useMemo(() => activeStep === 0, [activeStep])
	const isLastStep = useMemo(() => activeStep === steps.length - 1, [activeStep, steps])

	const handlePreviousStep = () => {
		setCompletedSteps((prevStepsCompleted) => {
			if (prevStepsCompleted.includes(activeStep - 1)) {
				prevStepsCompleted.splice(prevStepsCompleted.indexOf(activeStep), 1)
				return prevStepsCompleted
			}
			return prevStepsCompleted
		})
		setActiveStep((prevStep) => prevStep - 1)
	}

	const handleNextStep = () => {
		setCompletedSteps((prevStepsCompleted) => {
			if (!prevStepsCompleted.includes(activeStep)) {
				prevStepsCompleted.push(activeStep)
				return prevStepsCompleted
			}
			return prevStepsCompleted
		})
		setActiveStep((prevStep) => prevStep + 1)
	}

	return (
		<div className="flex flex-col p-4 bg-white gap-y-4 text-[#323B45]">
			<div className="bg-[#F9FBFC] rounded-md w-full flex gap-x-3 px-4 py-2">
				{steps?.map((step, idx) => (
					<div key={idx} className="flex items-center gap-x-3">
						<div
							className={`ease-in-out transition-all duration-150 rounded-full w-8 h-8 flex items-center justify-center shadow-sm ${
								isStepActive(idx)
									? 'bg-[#4F46E5] text-white'
									: isStepCompleted(idx)
									? 'bg-[#14B8A6] text-white'
									: 'bg-white text-[#4F46E5]'
							}`}
						>
							<span>{idx + 1}</span>
						</div>
						<div
							className={`ease-in-out transition-all duration-150  ${
								isStepActive(idx) ? 'text-[#4F46E5]' : isStepCompleted(idx) ? 'text-[#14B8A6]' : ''
							} `}
						>
							{step.title}
						</div>
						{idx !== steps.length - 1 && (
							<div
								className={`ease-in-out transition-all duration-150 w-10 border-t-2 ${
									isStepCompleted(idx) ? 'border-[#14B8A6] border-solid' : 'border-[#9CA3AF] border-dotted'
								} `}
							></div>
						)}
					</div>
				))}
			</div>
			<div className="py-6">{steps[activeStep].content}</div>
			<div className="flex justify-between">
				<button
					onClick={handlePreviousStep}
					disabled={isFirstStep}
					className={`rounded-md p-3 ease-in-out transition-all duration-75 text-slate-900 bg-white border-2 border-slate-200 hover:enabled:bg-[#ececec] disabled:bg-slate-50 disabled:opacity-60 disabled:text-slate-400 disabled:cursor-not-allowed`}
				>
					<span>Previous</span>
				</button>
				<button
					onClick={handleNextStep}
					disabled={isLastStep}
					className="rounded-md p-3 ease-in-out transition-all duration-75 bg-[#4F46E5] text-white hover:enabled:bg-[#4841c6] disabled:bg-[#6f6ad2] disabled:opacity-90 disabled:text-slate-100 disabled:cursor-not-allowed"
				>
					<span>Continue</span>
				</button>
			</div>
		</div>
	)
}

export default Stepper
