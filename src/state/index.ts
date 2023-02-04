import userConfig, { UserConfig } from './userConfig'
import appConfig, { AppConfig } from './appConfig'
import availableThemes, { AvailableThemes } from './availableTheme'
import eventLocations, { EventLocations } from './eventLocation'
import locales, { Locales } from './locales'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import sportEvents, { SportEvents } from './sportEvent'
import user, { User } from './user'

export interface AppState {
	appConfig: AppConfig
	availableThemes?: AvailableThemes
	connectedUser?: User
	eventLocations?: EventLocations
	locales?: Locales
	selectedContexts?: SelectedContexts
	sports?: Sports
	sportEvents?: SportEvents
	userConfig: UserConfig
}

export const reducers = {
	appConfig,
	availableThemes,
	connectedUser: user,
	eventLocations,
	locales,
	selectedContexts,
	sports,
	sportEvents,
	userConfig,
}
