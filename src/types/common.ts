import { ReactNode } from "react"

export type StepConfiguration = {
	id: string
	title?: string
	description?: string
	isLinear?: boolean
	content?: ReactNode
	required?: boolean
	subSteps?: StepConfiguration[]
}
