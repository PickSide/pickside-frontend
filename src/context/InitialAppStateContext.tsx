import { FC, ReactNode, createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsync } from 'react-use'
import { useApi } from 'hooks'
import { AppState } from 'state'

export interface InitialAppStateContextProps {
	children?: ReactNode
	loading?: boolean
}

const InitialAppStateContext = createContext<InitialAppStateContextProps>({
	loading: false,
})

export const InitialAppStateProvider: FC<any> = ({ children }) => {
	const areas = useSelector((state: AppState) => state.areas)
	const activities = useSelector((state: AppState) => state.activities)
	const locales = useSelector((state: AppState) => state.locales)
	const playables = useSelector((state: AppState) => state.playables)
	const settingsTemplate = useSelector((state: AppState) => state.settingsTemplate)
	const sports = useSelector((state: AppState) => state.sports)

	const dispatch = useDispatch()
	const { getAreas, getActivities, getLocales, getPlayables, getSettingsTemplate, getSports } = useApi()

	const { loading } = useAsync(async () => {
		if (!areas) {
			dispatch<any>(getAreas())
		}
		if (!activities) {
			dispatch<any>(getActivities())
		}
		if (!locales) {
			dispatch<any>(getLocales())
		}
		if (!playables) {
			dispatch<any>(getPlayables())
		}
		if (!settingsTemplate) {
			dispatch<any>(getSettingsTemplate())
		}
		if (!sports) {
			dispatch<any>(getSports())
		}
	}, [])

	return <InitialAppStateContext.Provider value={{ loading }}>{children}</InitialAppStateContext.Provider>
}

export default InitialAppStateContext
