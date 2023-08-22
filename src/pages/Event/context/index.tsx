import React, { createContext, useReducer } from 'react'
import { defaultStepperState, reducer } from '../state'

export const StepperContext = createContext<any>([])

export const StepperProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultStepperState)

	return <StepperContext.Provider value={[state, dispatch]}>{children}</StepperContext.Provider>
}
