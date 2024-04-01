import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, User } from '@state'

export type Notifications = Resources & {
	results?: Notification[]
}

export declare type NotificationType = 'system' | 'global' | 'like' | 'group-invite' | 'message-reminder' | 'friend-invite'

export type Notification = {
	id?: string
	content?: string
	created?: string
	expires?: string
	isRead?: boolean
	recipient?: User
	title?: string
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
