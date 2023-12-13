import { createContext, useReducer } from 'react'

export const ChatroomContext = createContext<any>(null)
export const ChatroomDispatchContext = createContext<any>(null)

const defaultState = {
	chatsOpened: [],
	chatsClosed: [],
	chatsMinimized: [],
}

const chatroomReducers = (state, action) => {
	switch (action.type) {
		case 'open':
			return { ...state, ...action, opened: true, prevState: state }
		case 'close':
			return defaultState
		case 'minimize':
			return state.prevState
		default:
			return defaultState
	}
}

export const ChatroomProvider = ({ children }) => {
	const [state, dispatch] = useReducer(chatroomReducers, defaultState)
	return (
		<ChatroomContext.Provider value={state}>
			<ChatroomDispatchContext.Provider value={dispatch}>{children}</ChatroomDispatchContext.Provider>
		</ChatroomContext.Provider>
	)
}

export default ChatroomContext
