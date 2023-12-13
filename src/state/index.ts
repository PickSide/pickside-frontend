import activities, { Activities } from './activity'
import appStatus, { AppStatus } from './appStatus'
import areas, { Areas } from './areas'
import chatrooms, { Chatroom, Chatrooms } from './chatrooms'
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
import selectedChatroom from './selectedChatroom'
import selectedLocation from './selectedLocation'
import selectedSport from './selectedSport'

export * from './activity'
export * from './appLocale'
export * from './appStatus'
export * from './appTheme'
export * from './areas'
export * from './chatrooms'
export * from './groups'
export * from './deactivated'
export * from './locales'
export * from './notifications'
export * from './playables'
export * from './selectedActivity'
export * from './selectedContext'
export * from './selectedLocation'
export * from './selectedSport'
export * from './selectedChatroom'
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
	chatrooms?: Chatrooms
	areas?: Areas
	deactivated?: boolean
	groups?: Groups
	locales?: Locales
	notifications?: Notifications
	onlineUsers?: User[]
	playables?: Playables
	selectedActivity?: any
	selectedChatroom?: Chatroom
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
	chatrooms,
	groups,
	locales,
	notifications,
	playables,
	selectedActivity,
	selectedChatroom,
	selectedContexts,
	selectedLocation,
	selectedSport,
	sports,
	toast,
	user,
}
