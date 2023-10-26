import { AppState, setUser } from '@state'
import { FC, ReactNode, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchActivities, useFetchLocales } from '@hooks'

import useFetchSports from '@hooks/services/useFetchSports'
import { useLocalStorage } from 'react-use'

export interface InitialAppStateContextProps {
	children?: ReactNode
	loading?: boolean
}

const InitialAppStateContext = createContext<InitialAppStateContextProps>({
	loading: false,
})

export const InitialAppStateProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const { isLoading: activitiesLoading } = useFetchActivities()
	const { isLoading: localesLoading } = useFetchLocales()
	const { isLoading: sportsLoading } = useFetchSports()
	const [cachedUser, setCachedUser] = useLocalStorage('user')
	const connectedUser = useSelector((state: AppState) => state.user)

	useEffect(() => {
		if (cachedUser && !connectedUser) {
			dispatch(setUser(cachedUser))
		}
		return (): void => {
			setCachedUser(connectedUser)
		}
	}, [])

	return (
		<InitialAppStateContext.Provider value={{ loading: activitiesLoading || localesLoading || sportsLoading }}>
			{children}
		</InitialAppStateContext.Provider>
	)
}

export default InitialAppStateContext
