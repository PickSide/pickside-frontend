import { FC, ReactNode, createContext } from 'react'
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
	const { isLoading: activitiesLoading } = useFetchActivities()
	const { isLoading: localesLoading } = useFetchLocales()
	const { isLoading: sportsLoading } = useFetchSports()

	return (
		<InitialAppStateContext.Provider value={{ loading: activitiesLoading || localesLoading || sportsLoading }}>
			{children}
		</InitialAppStateContext.Provider>
	)
}

export default InitialAppStateContext
