import { DECREMENT_CURRENT_STEP, INCREMENT_CURRENT_STEP, SET_STEPS } from '../utils/constants'
import { useCallback, useContext } from 'react'

import { StepperContext } from '../context'

export const useStepper = () => {
	const [state, dispatch] = useContext(StepperContext)
	const { currentStep, steps } = state

	if (!StepperContext) {
		throw new Error('useStepper should be used inside StepperProvider')
	}

	const previous = useCallback(() => {
		dispatch({
			type: DECREMENT_CURRENT_STEP,
		})
	}, [dispatch])

	const next = useCallback(() => {
		dispatch({
			type: INCREMENT_CURRENT_STEP,
		})
	}, [dispatch])

	const setSteps = useCallback((steps) => dispatch({ type: SET_STEPS, payload: { steps } }), [dispatch])

	return { currentStep, steps, setSteps, previous, next }
}
