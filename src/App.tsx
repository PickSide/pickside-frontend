import { Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { reducers } from 'state'
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
	const { connectedUser } = useTestData()

	return (
		<AppContext.Provider value={connectedUser || {}}>
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
