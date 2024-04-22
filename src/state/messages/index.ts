import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Messages {
    [key: string]: Message[]
}

export interface Message {
    id: string
    content: string
    chatroomId: string
    delivered: boolean
    senderId: string
    sentAt: string
}

const MessagesReducer = createSlice({
    initialState: {} as Messages,
    name: 'messages',
    reducers: {
        newMessage: (state, action: PayloadAction<{ chatroomId: string, message: Message }>) => {
            const { chatroomId, message } = action.payload
            if (!state[chatroomId]) {
                state[chatroomId] = [message]
            } else {
                state[chatroomId] = [...state[chatroomId], message]
            }
            return state
        },
        setMessages: (state, action: PayloadAction<{ chatroomId: string, messages: Message[] }>) => {
            const { chatroomId, messages } = action.payload
            state[chatroomId] = messages || []
            return state
        },
    },
})

export const { newMessage, setMessages } = MessagesReducer.actions

export default MessagesReducer.reducer
