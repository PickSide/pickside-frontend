import account, { Account } from './account'
import activities, { Activities } from './activity'
import appLocale from './appLocale'
import appStatus, { AppStatus } from './appStatus'
import appTheme from './appTheme'
import areas, { Areas } from './areas'
import locales, { Locales } from './locales'
import playables, { Playables } from './playables'
import notifications, { Notifications } from './notifications'
import selectedActivity from './selectedActivity'
import selectedContexts, { SelectedContexts } from './selectedContext'
import selectedLocation from './selectedLocation'
import sports, { Sports } from './sport'

export interface Resources {
	messageResponse?: string
	status?: any
}

export interface AppState {
	account?: Account
	activities?: Activities
	appLocale?: string
	appStatus?: AppStatus
	appTheme?: string
	areas?: Areas
	locales?: Locales
	playables?: Playables,
	notifications?: Notifications
	selectedActivity?: any,
	selectedLocation?: any
	selectedContexts?: SelectedContexts
	sports?: Sports
}

export const reducers = {
	account,
	activities,
	appLocale,
	appStatus,
	appTheme,
	areas,
	locales,
	playables,
	notifications,
	selectedActivity,
	selectedContexts,
	selectedLocation,
	sports,
}
