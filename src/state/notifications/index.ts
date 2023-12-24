import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Resources } from '@state'

export interface Notifications extends Resources {
	results?: Notification[]
}

export type NotificationType = 'system' | 'global' | 'user'

export interface Notification {
	id?: string
	created?: Date
	isRead: boolean
	receiver?: string
	sender?: string
	type: NotificationType
	message?: string
}

const NotificationsReducer = createSlice({
	initialState: null as unknown as Notifications,
	name: 'notifications',
	reducers: {
		setNotifications: (state, action: PayloadAction<Notifications>) => (state = { ...state, ...action.payload }),
		markAsRead: (state, action: PayloadAction<any>) => {
			if (state && state.results) {
				const idx = state.results.findIndex((item) => item.id === action.payload)
				state.results[idx].isRead = true
			}
			return state
		},
	},
})

export const { setNotifications, markAsRead } = NotificationsReducer.actions

export default NotificationsReducer.reducer
