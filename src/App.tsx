import React, { FC, createContext, useContext, useState } from 'react'
import { useWindowSize } from 'react-use'
import { RouterProvider, Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { useTheme } from '@mui/material'
import { reducers } from 'state'
import { AppContext, AppLayout, DefaultNavbar, NavbarContent } from 'components'
import useAppRoutes from 'hooks/useAppRoutes'
import HomePage from './pages/Home/HomePage'
import { useTestData } from 'hooks'

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
