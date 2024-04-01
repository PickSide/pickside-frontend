import { FC, ReactNode, createContext } from 'react'
import { useEffectOnce, useLocalStorage } from 'usehooks-ts'
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
	const { isLoading: meLoading, refetchMe } = useFetchMe()
	const [me] = useLocalStorage('user', null)

	useEffectOnce(() => {
		console.log(me)
		if (me) {
			refetchMe()
		}
	})

	return (
		<InitialAppStateContext.Provider value={{ loading: activitiesLoading || localesLoading || sportsLoading || meLoading }}>
			{children}
		</InitialAppStateContext.Provider>
	)
}

export default InitialAppStateContext
