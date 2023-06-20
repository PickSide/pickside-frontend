import { FC, useMemo, useState, forwardRef } from 'react'
import { BiArrowBack, BiCheck } from 'react-icons/bi'
import { AiOutlineCheck } from 'react-icons/ai'
import { StepConfiguration } from 'types'
import { useMultistepForm, useIsMobile } from 'hooks'
import { motion } from 'framer-motion'
import { slideIn } from 'utils'

interface StepperProps {
	steps: StepConfiguration[]
}

const Stepper = ({ steps }: StepperProps, ref) => {
	const isMobile = useIsMobile()
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
		<div className="rounded-md relative w-full flex flex-col py-8 px-10 bg-white gap-y-8 text-[#323B45] overflow-x-hidden">
			<div className="w-full flex justify-between p-2 m-auto">
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
							{isStepCompleted(idx) && (
								<span className="absolute text-white m-auto">
									<BiCheck size={15} />
								</span>
							)}
							<span
								className={`absolute whitespace-nowrap -translate-x-1/2 left-1/2 -top-7 mx-auto ${
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
			</div>
			<div className="py-6 w-[600px] h-[400px]">{steps[activeStep].content}</div>
			<div className="flex flex-grow justify-between">
				<button
					onClick={() => {
						setSlide('right')
						handlePreviousStep()
					}}
					disabled={isFirstStep}
					className="w-32 font-semibold rounded-md p-3 ease-in-out transition-all duration-75 bg-none text-gray-700 hover:enabled:text-gray-300 disabled:text-gray-200 disabled:opacity-90 disabled:cursor-not-allowed"
				>
					<span>Previous</span>
				</button>
				<button
					onClick={() => {
						setSlide('right')
						handleNextStep()
					}}
					disabled={isLastStep}
					className="w-32 rounded-md p-3 ease-in-out transition-all duration-75 bg-black text-white hover:enabled:bg-gray-200 disabled:opacity-90 disabled:text-slate-100 disabled:cursor-not-allowed"
				>
					<span>Next</span>
				</button>
			</div>
		</div>
	)

	return isMobile ? <StepperMobile /> : <StepperScreen />
}

export default forwardRef(Stepper)
