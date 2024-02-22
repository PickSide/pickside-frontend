import { FC, createContext, useEffect } from 'react'
import { Socket, io } from 'socket.io-client'

interface RTAContentContextProps {
	chatroomsSocket: Socket
	groupsSocket: Socket
	usersSocket: Socket
}

const URL = import.meta.env.VITE_APP_API_BASE_URL_V2

const defaultOptions = {
	autoConnect: false,
}

const chatroomsSocket = io(URL + '/chatrooms', defaultOptions)
const groupsSocket = io(URL + '/groups', defaultOptions)
const usersSocket = io(URL + '/users', defaultOptions)

const Context = createContext<RTAContentContextProps>({ chatroomsSocket, groupsSocket, usersSocket })

export const RTAContentProvider: FC<any> = ({ children }) => {
	// useEffect(() => {
	// 	chatroomsSocket.connect()
	// 	groupsSocket.connect()
	// 	usersSocket.connect()

	// 	return () => {
	// 		chatroomsSocket.disconnect()
	// 		groupsSocket.disconnect()
	// 		usersSocket.disconnect()
	// 	}
	// }, [])

	return <Context.Provider value={{ chatroomsSocket, groupsSocket, usersSocket }}>{children}</Context.Provider>
}

export default Context
