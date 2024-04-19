import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Resources } from '@state'

export interface Messages extends Resources {
    results?: Message[]
}

export interface Message {
    id: string
    content: string
    chatroomId: string
    delivered: boolean
    sentAt: string
}

const LocalesReducer = createSlice({
    initialState: [] as Messages,
    name: 'messages',
    reducers: {
        loadChatroomMessages: (state, action: PayloadAction<Messages>) => (state = action.payload),
    },
})

export const { loadChatroomMessages } = LocalesReducer.actions

export default LocalesReducer.reducer
