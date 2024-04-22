import activities, { Activities } from './activity'
import chatrooms, { Chatroom } from './chatrooms'
import groups, { Groups } from './groups'
import locales, { Locales } from './locales'
import messages, { Messages } from './messages'
import notifications, { Notifications } from './notifications'
import selectedContexts, { SelectedContexts } from './selectedContext'
import sports, { Sports } from './sport'
import toast, { Toast } from './toast'
import user, { User } from './me'

import activeChatrooms from './activeChatrooms'
import appLocale from './appLocale'
import appTheme from './appTheme'
import { combineReducers } from '@reduxjs/toolkit'
import selectedActivity from './selectedActivity'
import selectedLocation from './selectedLocation'

export * from './activeChatrooms'
export * from './activity'
export * from './appLocale'
export * from './appTheme'
export * from './chatrooms'
export * from './deactivated'
export * from './groups'
export * from './locales'
export * from './me'
export * from './messages'
export * from './notifications'
export * from './selectedActivity'
export * from './selectedContext'
export * from './selectedLocation'
export * from './sport'
export * from './toast'

export interface Resources {
	message?: string
	success?: boolean
	status?: any
}

export interface AppState {
	activeChatrooms?: Chatroom[]
	activities?: Activities
	appLocale?: string
	appTheme?: string
	chatrooms?: Chatroom[]
	deactivated?: boolean
	groups?: Groups
	locales?: Locales
	messages?: Messages
	notifications?: Notifications
	onlineUsers?: User[]
	selectedActivity?: any
	selectedContexts?: SelectedContexts
	selectedLocation?: any
	selectedSport?: any
	sports?: Sports
	toast?: Toast
	user?: User
}

export const reducers = combineReducers({
	activeChatrooms,
	activities,
	appLocale,
	appTheme,
	chatrooms,
	groups,
	locales,
	messages,
	notifications,
	selectedActivity,
	selectedContexts,
	selectedLocation,
	sports,
	toast,
	user,
})
