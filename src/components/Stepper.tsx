import { FC, useMemo, useState, forwardRef } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { StepConfiguration } from 'types'
import { useMultistepForm } from 'hooks'
import { motion } from 'framer-motion'
import { slideIn } from 'utils'

interface StepperProps {
	steps: StepConfiguration[]
}

const Stepper = ({ steps }: StepperProps, ref) => {
	const { activeStep, isStepActive, isFirstStep, isLastStep, isStepCompleted, handlePreviousStep, handleNextStep } =
		useMultistepForm(steps.map((x) => x.content))

	const [slide, setSlide] = useState<'right' | 'left' | 'none'>('none')

	return (
		<div className="rounded-md relative w-full flex flex-col py-8 px-10 bg-white gap-y-8 text-[#323B45]">
			{!isFirstStep && (
				<div
					onClick={handlePreviousStep}
					className="flex px-2 gap-x-3 text-secondary cursor-pointer ease-in hover:text-slate-500"
				>
					<BiArrowBack size={25} />
				</div>
			)}
			<div className="w-full flex justify-between p-2 m-auto">
				{steps.map((step, idx) => (
					<div className={` flex ${idx !== steps.length - 1 ? 'flex-grow' : 'flex-shrink'}`}>
						<div
							className={`relative rounded-full w-5 h-5 border-2 bg-none ease-in-out transition-all duration-75
							${
								isStepActive(idx)
									? 'border-[#14B8A6]'
									: isStepCompleted(idx)
									? 'border-[#14B8A6] bg-[#14B8A6]'
									: 'border-[#E3E1E8] bg-none'
							}`}
						>
							<span
								className={`absolute w-fit -translate-x-1/2 left-1/2 -top-7 mx-auto ${
									isStepActive(idx) ? 'text-[#14B8A6] font-semibold' : 'text-[#cdcbd1]'
								} ease-in-out transition-all duration-75`}
							>
								{step.title}
							</span>
						</div>
						{idx !== steps.length - 1 && (
							<div
								className={`flex-1 border-t-2 border-solid mt-2 ease-in-out transition-all duration-75 ${
									isStepCompleted(idx) ? 'border-[#14B8A6]' : 'border-[#E3E1E8]'
								}`}
							></div>
						)}
					</div>
				))}
			</div>
			<motion.div variants={slideIn(slide)} initial="hidden" animate="show" className="py-6 w-fit m-auto flex-1">
				{steps[activeStep].content}
			</motion.div>
			<div className="flex flex-grow justify-center">
				<button
					onClick={() => {
						setSlide('right')
						handleNextStep()
					}}
					disabled={isLastStep}
					className="w-[40%] rounded-md p-3 ease-in-out transition-all duration-75 bg-[#4F46E5] text-white hover:enabled:bg-[#4841c6] disabled:bg-[#6f6ad2] disabled:opacity-90 disabled:text-slate-100 disabled:cursor-not-allowed"
				>
					<span>Continue</span>
				</button>
			</div>
		</div>
	)
}

export default forwardRef(Stepper)
