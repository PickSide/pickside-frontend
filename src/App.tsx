import React, { FC, createContext, useContext, useState } from 'react'
import { useWindowSize } from 'react-use'
import { RouterProvider, Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { ThemeProvider, useTheme } from '@mui/material'
import { reducers } from 'state'
import { User } from '../src/state/user/index'
import { AppContext, AppLayout, DefaultNavbar, NavbarContent } from 'components'
import useAppRoutes from 'hooks/useAppRoutes'
import HomePage from './pages/Home/HomePage'

const middleware = [...getDefaultMiddleware()]

export const store = configureStore({
	reducer: reducers,
	middleware,
})

const randomUser1: User = {
	firstName: 'Antoine',
	lastName: 'Hakim',
	sexe: 'male',
	level: 5,
	darkMode: false,
}

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

const App = () => {
	const theme = useTheme()
	const windowSize = useWindowSize()
	const { routes } = useAppRoutes()

	return (
		<AppContext.Provider value={randomUser1}>
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
