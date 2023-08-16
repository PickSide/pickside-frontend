import React, { useEffect } from 'react'
import { useStepper } from '../../hooks'

export const StepperSteps = ({ children }) => {
	const { currentStep, steps, setSteps } = useStepper()

	useEffect(() => {
		const stepperSteps = React.Children.toArray(children)
			.filter((step: any) => {
				return step.type.name === 'StepperStep'
			})
			.map((step: any) => step.props)
		setSteps(stepperSteps)
	}, [setSteps])

	return (
		<>
			{children &&
				React.Children.map(children, (child) => {
					if (steps.length) {
						return child.props.order === steps[currentStep].order ? child : null
					}
				})}
		</>
	)
}

export const StepperStep = ({ order, title, children }) => {
	return <>{children}</>
}
