import { createContext, useContext, useReducer } from 'react'

import Chatroom from '@components/global/Chatroom'
import { Chatroom as IChatroom } from '@state/chatrooms'

export const ChatroomContext = createContext<any>(null)
export const ChatroomDispatchContext = createContext<any>(null)

const defaultState = {
	chatsOpened: [],
}

const chatroomReducers = (state, action) => {
	switch (action.type) {
		case 'open':
			console.log(state)
			return state
		case 'close':
			console.log(state)
			return state
		default:
			return defaultState
	}
}

export const ChatroomProvider = ({ children }) => {
	const [state, dispatch] = useReducer(chatroomReducers, defaultState)

	return (
		<ChatroomContext.Provider value={state}>
			<ChatroomDispatchContext.Provider value={dispatch}>
				{state.chatsOpened.map((chat, idx) => (
					<Chatroom key={idx} />
				))}
				{children}
			</ChatroomDispatchContext.Provider>
		</ChatroomContext.Provider>
	)
}

export default ChatroomContext
