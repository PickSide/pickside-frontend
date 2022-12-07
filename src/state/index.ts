import sportEvents, { SportEvents } from './sportEvent'
import appConfig, { AppConfig } from './config'
import eventLocations, { EventLocations, EventLocation } from './eventLocation'
import selectedEvent from './selectedEvent'
import sports, { Sports } from './sport'
import user, { User } from './user'

export interface AppState {
	appConfig?: AppConfig
	connectedUser?: User
	eventLocations?: EventLocations
	selectedEvent?: EventLocation
	sports?: Sports
	sportEvents?: SportEvents
}

export const reducers = {
	appConfig,
	connectedUser: user,
	eventLocations,
	selectedEvent,
	sports,
	sportEvents,
}
