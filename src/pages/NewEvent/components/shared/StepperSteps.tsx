import { Children, FC, useEffect } from 'react'

import { useStepper } from '../../hooks/useStepper'

export const StepperStep: FC<any> = ({ order, title, children }) => {
	return <>{children}</>
}

export const StepperSteps = ({ children }) => {
	const { currentStep, steps, setSteps } = useStepper()

	useEffect(() => {
		const stepperSteps = Children.toArray(children).map((step: any) => step.props)
		setSteps(stepperSteps)
	}, [children, setSteps])

	return (
		<>
			{children &&
				Children.map(children, (child) => {
					if (steps.length) {
						return child.props.order === steps[currentStep].order ? child : null
					}
				})}
		</>
	)
}
