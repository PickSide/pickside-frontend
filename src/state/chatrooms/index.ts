import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, User } from '@state'

export interface Chatrooms extends Resources {
	results: Chatroom[]
}

export interface Chatroom {
	id?: string
	name?: string
	participants?: Partial<User>[]
	openedChatroom?: User[]
	numberOfMessages?: number
	lastMessage?: any
	startedBy?: User
}

const Chatrooms = createSlice({
	initialState: null as unknown as Chatrooms | null,
	name: 'Chatrooms',
	reducers: {
		setChatrooms: (state, action: PayloadAction<Chatrooms>) => (state = action.payload),
	},
})

export const { setChatrooms } = Chatrooms.actions

export default Chatrooms.reducer
