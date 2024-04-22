import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from '@state'

export interface Chatroom {
	id?: string
	name?: string
	participants?: Partial<User>[]
	numberOfMessages?: Number
}

const ChatroomsReducer = createSlice({
	initialState: [] as Chatroom[],
	name: 'chatrooms',
	reducers: {
		setChatroom: (state, action: PayloadAction<Chatroom>) => (state = [...state, action.payload]),
		setChatrooms: (state, action: PayloadAction<Chatroom[]>) => (state = [...state, ...action.payload]),
	},
})

export const { setChatroom, setChatrooms } = ChatroomsReducer.actions

export default ChatroomsReducer.reducer
