import appConfig, { AppConfig } from './config'
import appTheme from './appTheme'
import availableThemes, { AvailableThemes } from './availableTheme'
import eventLocations, { EventLocations } from './eventLocation'
import locales, { Locales } from './locales'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import sportEvents, { SportEvents } from './sportEvent'
import user, { User } from './user'

export interface AppState {
	appConfig: AppConfig
	appTheme: string
	availableThemes?: AvailableThemes
	connectedUser?: User
	eventLocations?: EventLocations
	locales?: Locales
	selectedContexts?: SelectedContexts
	sports?: Sports
	sportEvents?: SportEvents
}

export const reducers = {
	appConfig,
	appTheme,
	availableThemes,
	connectedUser: user,
	eventLocations,
	locales,
	selectedContexts,
	sports,
	sportEvents,
}
