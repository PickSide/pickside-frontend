import { AppState, User, setUser } from '@state'
import { FC, ReactNode, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectOnce, useLocalStorage } from 'usehooks-ts'
import { useFetchActivities, useFetchLocales } from '@hooks'

import useFetchSports from '@hooks/services/useFetchSports'

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
	const [cachedUser, setCachedUser] = useLocalStorage<User | null>('user', null)
	const connectedUser = useSelector((state: AppState) => state.user)

	useEffectOnce(() => {
		if (cachedUser && !connectedUser) {
			dispatch(setUser(cachedUser))
		}
		return (): void => {
			if (connectedUser) {
				setCachedUser(connectedUser)
			}
		}
	})

	return (
		<InitialAppStateContext.Provider value={{ loading: activitiesLoading || localesLoading || sportsLoading }}>
			{children}
		</InitialAppStateContext.Provider>
	)
}

export default InitialAppStateContext
