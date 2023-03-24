import account, { Account } from './account'
import appLocale, { AppLocal } from './appLocale'
import appTheme from './appTheme'
import eventLocations, { EventLocations } from './eventLocation'
import locales, { Locales } from './locales'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import sportEvents, { SportEvents } from './sportEvent'

export interface AppState {
	account?: Account
	appLocale?: AppLocal
	appTheme?: string
	eventLocations?: EventLocations
	locales?: Locales
	selectedContexts?: SelectedContexts
	sports?: Sports
	sportEvents?: SportEvents
}

export const reducers = {
	account,
	appLocale,
	appTheme,
	eventLocations,
	locales,
	selectedContexts,
	sports,
	sportEvents,
}
