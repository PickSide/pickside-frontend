import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ServerResponse {
	callback?: string
	context?: any
	extra?: any
	failReason?: any
	jobStatus?: 'FAILED' | 'COMPLETED'
	jobType?: any
	message?: string
	res: Response
	status: any
	timeStamp?: Date
	payload?: any
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const toPascalCase = (str) =>
	!!str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
		.join('')
