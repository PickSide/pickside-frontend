import { AppState, User, setUser } from '@state'
import { FC, createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useApi } from '@hooks'

const Context = createContext<any>({})

export const useNotificationContext = () => useContext(Context)

export const NotificationProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const { getNotifications } = useApi()

	const connectedUser = useSelector((state: AppState) => state.user)

	useEffect(() => {
		if (connectedUser) {
			dispatch<any>(getNotifications())
		}
	}, [connectedUser, dispatch])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
