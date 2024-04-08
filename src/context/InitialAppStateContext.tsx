import { FC, ReactNode, createContext } from 'react'
import { useFetchActivities, useFetchLocales, useFetchSports } from '@hooks'

export interface InitialAppStateContextProps {
	children?: ReactNode
	isAppLoading?: boolean
}

const InitialAppStateContext = createContext<InitialAppStateContextProps>({
	isAppLoading: false,
})

export const InitialAppStateProvider: FC<any> = ({ children }) => {
	const { isLoading: activitiesLoading } = useFetchActivities()
	const { isLoading: localesLoading } = useFetchLocales()
	const { isLoading: sportsLoading } = useFetchSports()

	return (
		<InitialAppStateContext.Provider value={{ isAppLoading: activitiesLoading || localesLoading || sportsLoading }}>
			{children}
		</InitialAppStateContext.Provider>
	)
}

export default InitialAppStateContext
