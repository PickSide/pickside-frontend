import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, User } from '@state'

export interface Chatrooms extends Resources {
	results?: Chatroom[]
}

export interface Chatroom {
	id?: string
	name?: string
	participants?: Partial<User>[]
	numberOfMessages?: Number
}

const ChatroomsReducer = createSlice({
	initialState: { results: [] } as Chatrooms,
	name: 'chatrooms',
	reducers: {
		setChatrooms: (state, action: PayloadAction<Chatrooms>) => (state = { ...state, ...action.payload }),
	},
})

export const { setChatrooms } = ChatroomsReducer.actions

export default ChatroomsReducer.reducer
