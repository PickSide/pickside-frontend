import { ActivityType } from 'state/activity'
import { Address } from 'types'

export type ActivityEventType = ActivityType

export interface ActivityEvent {
	type?: ActivityEventType
	free?: boolean
	pricePerUnit?: number
	location?: Address
}
