import { AppState, Notification } from '@state'
import { FC, ReactNode, createContext, useEffect } from 'react'

import { useFetchNotifications } from '@hooks'
import { useSelector } from 'react-redux'

export interface NotificationContextProps {
	children?: ReactNode
	loading?: boolean
	notifications: Notification[]
}

const NotificationContext = createContext<NotificationContextProps>({
	loading: false,
	notifications: [],
})

export const NotificationProvider: FC<any> = ({ children }) => {
	const { notifications, isLoading, refetch: fetchNotifications } = useFetchNotifications()

	const me = useSelector((state: AppState) => state.user)

	useEffect(() => {
		if (me) {
			fetchNotifications()
		}
	}, [me])

	return (
		<NotificationContext.Provider value={{ loading: isLoading, notifications: notifications?.data.result || [] }}>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
