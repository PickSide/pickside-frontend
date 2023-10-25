import activities, { Activities } from './activity'
import appStatus, { AppStatus } from './appStatus'
import areas, { Areas } from './areas'
import groups, { Groups } from './groups'
import locales, { Locales } from './locales'
import notifications, { Notifications } from './notifications'
import playables, { Playables } from './playables'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import toast, { Toast } from './toast'
import user, { User } from './user'

import appLocale from './appLocale'
import appTheme from './appTheme'
import selectedActivity from './selectedActivity'
import selectedLocation from './selectedLocation'
import selectedSport from './selectedSport'

export * from './activity'
export * from './appLocale'
export * from './appStatus'
export * from './appTheme'
export * from './areas'
export * from './groups'
export * from './deactivated'
export * from './locales'
export * from './notifications'
export * from './playables'
export * from './selectedActivity'
export * from './selectedContext'
export * from './selectedLocation'
export * from './selectedSport'
export * from './sport'
export * from './toast'
export * from './user'

export interface Resources {
	messageResponse?: string
	status?: any
}

export interface AppState {
	activities?: Activities
	appLocale?: string
	appStatus?: AppStatus
	appTheme?: string
	areas?: Areas
	deactivated?: boolean
	groups?: Groups
	locales?: Locales
	notifications?: Notifications
	playables?: Playables
	selectedActivity?: any
	selectedContexts?: SelectedContexts
	selectedLocation?: any
	selectedSport?: any
	sports?: Sports
	toast?: Toast
	user?: User
}

export const reducers = {
	activities,
	appLocale,
	appStatus,
	appTheme,
	areas,
	groups,
	locales,
	notifications,
	playables,
	selectedActivity,
	selectedContexts,
	selectedLocation,
	selectedSport,
	sports,
	toast,
	user,
}
