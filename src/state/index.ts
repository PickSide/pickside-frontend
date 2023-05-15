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
import selectedSport from './selectedSport'
import settingsTemplate, { SettingsTemplate } from './settingsTemplate'
import sports, { Sports } from './sport'
import toast, { Toast } from './toast'

export * from './account'
export * from './activity'
export * from './appLocale'
export * from './appStatus'
export * from './appTheme'
export * from './areas'
export * from './locales'
export * from './playables'
export * from './notifications'
export * from './selectedActivity'
export * from './selectedContext'
export * from './selectedLocation'
export * from './selectedSport'
export * from './settingsTemplate'
export * from './sport'
export * from './toast'

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
	selectedContexts?: SelectedContexts
	selectedLocation?: any
	selectedSport?: any
	settingsTemplate?: SettingsTemplate
	sports?: Sports
	toast?: Toast
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
	selectedSport,
	settingsTemplate,
	sports,
	toast
}