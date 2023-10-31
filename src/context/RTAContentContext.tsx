import { FC, createContext, useEffect } from 'react'

import { Socket } from 'socket.io-client'
import socket from './utils/socket'

interface RTAContentContextProps {
	socket: Socket
}

const Context = createContext<RTAContentContextProps>({ socket })

export const RTAContentProvider: FC<any> = ({ children }) => {
	useEffect(() => {
		socket.connect()

		return () => {
			socket.disconnect()
		}
	}, [])

	return <Context.Provider value={{ socket }}>{children}</Context.Provider>
}

export default Context
