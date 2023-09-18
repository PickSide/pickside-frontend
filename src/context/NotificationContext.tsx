import { FC, createContext, useContext, useEffect } from 'react'

import { AppState } from '@state'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const Context = createContext<any>({})

export const useNotificationContext = () => useContext(Context)

export const NotificationProvider: FC<any> = ({ children }) => {
	const connectedUser = useSelector((state: AppState) => state.user)

	const NOTIFICATION_KEY = 'notify'

	useEffect(() => {
		if (connectedUser) {
			const socket = io(import.meta.env.VITE_APP_API_URL_NOTIFICATIONS)

			socket.on(NOTIFICATION_KEY, (data) => {
				console.log('received', data)
			})
		}
	}, [connectedUser])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
