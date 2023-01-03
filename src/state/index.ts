import sportEvents, { SportEvents } from './sportEvent'
import appConfig, { AppConfig } from './config'
import eventLocations, { EventLocations } from './eventLocation'
import locales, { Locales } from './locales'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import user, { User } from './user'

export interface AppState {
	appConfig?: AppConfig
	connectedUser?: User
	eventLocations?: EventLocations
	locales?: Locales
	selectedContexts?: SelectedContexts
	sports?: Sports
	sportEvents?: SportEvents
}

export const reducers = {
	appConfig,
	connectedUser: user,
	eventLocations,
	locales,
	selectedContexts,
	sports,
	sportEvents,
}
