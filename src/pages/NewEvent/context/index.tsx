import { DECREMENT_CURRENT_STEP, INCREMENT_CURRENT_STEP, SET_STEPS } from '../utils/constants'
import { createContext, useReducer } from 'react'

interface StepperStateProps {
	steps: any[]
	currentStep: number
}
export const defaultStepperState: StepperStateProps = {
	steps: [],
	currentStep: 0,
}

export const reducer = (state = defaultStepperState, action) => {
	const { currentStep, steps } = state
	const { type, payload } = action

	switch (type) {
		case SET_STEPS:
			return {
				...state,
				steps: payload.steps,
			}
		case INCREMENT_CURRENT_STEP:
			return {
				...state,
				currentStep: currentStep < steps.length - 1 ? currentStep + 1 : currentStep,
			}
		case DECREMENT_CURRENT_STEP:
			return {
				...state,
				currentStep: currentStep > 0 ? currentStep - 1 : currentStep,
			}

		default:
			return state
	}
}

export const StepperContext = createContext<any>([])

export const StepperProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultStepperState)

	return <StepperContext.Provider value={[state, dispatch]}>{children}</StepperContext.Provider>
}
