import { ReactNode, useMemo, useState } from 'react'
import { StepConfiguration } from 'types'

const useMultistepForm = (steps: ReactNode[]) => {
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

    return {
        activeStep,
        isStepCompleted,
        isStepActive,
        isFirstStep,
        isLastStep,
        handlePreviousStep,
        handleNextStep
    }
}

export default useMultistepForm