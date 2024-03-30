import { FC, createContext, useEffect } from 'react'
import { Socket, io } from 'socket.io-client'

interface SocketContextProps {
	// chatroomsSocket: Socket
	// groupsSocket: Socket
	notificationsSocket: Socket
	// usersSocket: Socket
}

const URL = import.meta.env.VITE_APP_QS_URL

const defaultOptions = {
	autoConnect: false,
}

//const chatroomsSocket = io(URL + '/chatrooms', defaultOptions)
//const groupsSocket = io(URL + '/groups', defaultOptions)
const notificationsSocket = io(URL + '/notifications', defaultOptions)
//const usersSocket = io(URL + '/users', defaultOptions)

const Context = createContext<SocketContextProps>({ notificationsSocket })

export const SocketProvider: FC<any> = ({ children }) => {
	useEffect(() => {
		// chatroomsSocket.connect()
		// groupsSocket.connect()
		notificationsSocket.connect()
		notificationsSocket.emit("notifications:check", { message: "bitch" })
		// usersSocket.connect()

		return () => {
			// chatroomsSocket.disconnect()
			// groupsSocket.disconnect()
			notificationsSocket.disconnect()
			//usersSocket.disconnect()
		}
	}, [])
	console.log(notificationsSocket)

	return <Context.Provider value={{ notificationsSocket }}>{children}</Context.Provider>
}

export default Context
