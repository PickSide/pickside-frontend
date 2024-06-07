import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, User } from '@state'

export type Notifications = Resources & {
	result?: Notification[]
}

export type Notification = {
	id?: string
	content?: string
	created?: string
	expires?: string
	extra?: string | any
	isRead?: boolean
	recipient?: User
	type?: 'group-invite' | 'friend-request' | 'group-settings-changed' | 'event-invite' | 'event-approaching'
	title?: string
}

export type NotificationExtra = {
	groupId?: string
	userId?: string
	organizerId?: string
	activityId?: string
	date?: string
}

const NotificationsReducer = createSlice({
	initialState: null as unknown as Notifications,
	name: 'notifications',
	reducers: {
		setNotifications: (state, action: PayloadAction<Notifications>) => (state = { ...state, ...action.payload }),
		markSeen: (state, action: PayloadAction<string>) => {
			if (state && state.result) {
				const idx = state.result.findIndex((item) => item.id === action.payload)
				state.result[idx].isRead = true
			}
			return state
		},
	},
})

export const { setNotifications, markSeen } = NotificationsReducer.actions

export default NotificationsReducer.reducer
