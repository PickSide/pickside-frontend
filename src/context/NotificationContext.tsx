import { FC, ReactNode, createContext, useEffect } from 'react'
import { useFetchMe, useFetchNotifications } from '@hooks'

export interface NotificationContextProps {
	children?: ReactNode
	amILoading?: boolean
}

const NotificationContext = createContext<NotificationContextProps>({
	amILoading: false,
})

export const NotificationProvider: FC<any> = ({ children }) => {
	const { isLoading: meLoading, me } = useFetchMe()
	const { refetch: fetchNotifications } = useFetchNotifications()

	useEffect(() => {
		if (!meLoading && me) {
			fetchNotifications()
		}
	}, [me, meLoading])

	return <NotificationContext.Provider value={{ amILoading: meLoading }}>{children}</NotificationContext.Provider>
}

export default NotificationContext
