import { FC, ReactNode, createContext } from 'react'
import { useFetchActivities, useFetchLocales, useFetchMe, useFetchSports } from '@hooks'

export interface InitialAppStateContextProps {
	children?: ReactNode
	loading?: boolean
}

const InitialAppStateContext = createContext<InitialAppStateContextProps>({
	loading: false,
})

export const InitialAppStateProvider: FC<any> = ({ children }) => {
	const { isLoading: activitiesLoading } = useFetchActivities()
	const { isLoading: localesLoading } = useFetchLocales()
	const { isLoading: sportsLoading } = useFetchSports()
	const { isLoading: meLoading } = useFetchMe()

	return (
		<InitialAppStateContext.Provider value={{ loading: activitiesLoading || localesLoading || sportsLoading || meLoading }}>
			{children}
		</InitialAppStateContext.Provider>
	)
}

export default InitialAppStateContext
