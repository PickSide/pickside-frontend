import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Chatroom } from '@state/chatrooms'

const ActiveChatroomsReducer = createSlice({
	initialState: [] as Chatroom[],
	name: 'activeChatrooms',
	reducers: {
		setActiveChatroom: (state, action: PayloadAction<Chatroom>) => {
			const index = state.findIndex(x => x.id === action.payload.id);
			if (index !== -1) {
				state.splice(index, 1);
			} else {
				state = [...state, action.payload]
			}
			return state
		},
	},
})

export const { setActiveChatroom } = ActiveChatroomsReducer.actions

export default ActiveChatroomsReducer.reducer
