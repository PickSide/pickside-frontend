import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from '@state'

export interface Chatroom {
	id?: string
	name?: string
	participants?: Partial<User>[]
	openedChatroom?: User[]
	numberOfMessages?: number
	lastMessage?: any
	startedBy?: User
}

const ChatroomsReducer = createSlice({
	initialState: ([] as Chatroom[]) || [],
	name: 'chatrooms',
	reducers: {
		openChatroom: (state, action: PayloadAction<Chatroom>) => {
			const chatIdx = state.findIndex((c) => c.id === action.payload.id)
			if (chatIdx > -1) {
				return state.filter((c) => c.id !== action.payload.id)
			} else {
				return [...state, action.payload]
			}
		},
		closeChatroom: (state, action: PayloadAction<Chatroom>) => state.filter((c) => c.id !== action.payload.id),
	},
})

export const { openChatroom, closeChatroom } = ChatroomsReducer.actions

export default ChatroomsReducer.reducer
