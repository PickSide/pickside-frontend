import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Chatroom } from '@state/chatrooms'

const SelectedChatroomReducer = createSlice({
	initialState: null as unknown as {} | null,
	name: 'selectedChatroom',
	reducers: {
		setSelectedChatroom: (state, action: PayloadAction<Chatroom>) => (state = action.payload),
	},
})

export const { setSelectedChatroom } = SelectedChatroomReducer.actions

export default SelectedChatroomReducer.reducer
