import account, { Account } from './account'
import appLocale from './appLocale'
import appStatus, { AppStatus } from './appStatus'
import appTheme from './appTheme'
import areas, { Areas } from './areas'
import eventLocations, { EventLocations } from './eventLocation'
import locales, { Locales } from './locales'
import notifications, { Notifications } from './notifications'
import selectedArea from './selectedDistrict'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import sportEvents, { SportEvents } from './sportEvent'

export interface Resources {
	messageResponse?: string
	status?: any
}

export interface AppState {
	account?: Account
	appLocale?: string
	appStatus?: AppStatus
	appTheme?: string
	areas?: Areas
	eventLocations?: EventLocations
	locales?: Locales
	notifications?: Notifications
	selectedArea?: string
	selectedContexts?: SelectedContexts
	sports?: Sports
	sportEvents?: SportEvents
}

export const reducers = {
	account,
	appLocale,
	appStatus,
	appTheme,
	areas,
	eventLocations,
	locales,
	notifications,
	selectedArea,
	selectedContexts,
	sports,
	sportEvents,
}
