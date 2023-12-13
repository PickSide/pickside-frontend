import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Chatroom } from '@state/chatrooms'

const SelectedChatroom = createSlice({
	initialState: null as unknown as {},
	name: 'selectedChatroom',
	reducers: {
		setSelectedChatroom: (state, action: PayloadAction<Chatroom>) => (state = action.payload),
	},
})

export const { setSelectedChatroom } = SelectedChatroom.actions

export default SelectedChatroom.reducer
