import { useEffect, useState } from 'react'
import { useMountedState } from 'react-use'
import { Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { AppState, reducers } from 'state'
import { DefaultNavbar, NavbarContent } from 'components'
import { useTestData } from 'hooks'
import { AppContext } from 'utils'

import HomePage from './pages/Home/HomePage'

const middleware = [...getDefaultMiddleware()]

export const store = configureStore({
	reducer: reducers,
	middleware,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

const App = () => {
	const { appConfig, connectedUser, activitesInRegion } = useTestData()
	const isMounted = useMountedState()

	const [appState, setAppState] = useState<AppState>()

	useEffect(() => {
		if (isMounted()) {
			setAppState({
				activities: activitesInRegion,
				appConfig,
				connectedUser,
			})
		}
	}, [appConfig, connectedUser, activitesInRegion])

	return (
		<AppContext.Provider value={appState || {}}>
			<Provider store={store}>
				<DefaultNavbar>
					<NavbarContent />
				</DefaultNavbar>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</Provider>
		</AppContext.Provider>
	)
}

export default App
