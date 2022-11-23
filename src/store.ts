import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducers } from 'state'
import { activities, appConfig, connectedUser } from '../src/testData'

const middleware = [...getDefaultMiddleware()]

export const store = configureStore({
	reducer: reducers,
	middleware,
	preloadedState: {
		activities,
		appConfig,
		connectedUser,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
