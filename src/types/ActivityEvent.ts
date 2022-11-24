import { Address } from 'types'

export type ActivityType = 'soccer' | 'basketball' | 'tennis' | 'american_football' | 'squash'

export type ActivityEventType = ActivityType

export interface ActivityEvent {
	type?: ActivityEventType
	free?: boolean
	pricePerUnit?: number
	location?: Address
}

export interface Sport {
	id?: string
	value?: string
	description?: string
}
