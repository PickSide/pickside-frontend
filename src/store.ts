import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducers } from 'state'
import { activities, appConfig, connectedUser, sports } from '../src/testData'

const middleware = [
	...getDefaultMiddleware({
		serializableCheck: false,
	}),
]

export const store = configureStore({
	reducer: reducers,
	middleware,
	preloadedState: {
		activities,
		appConfig,
		connectedUser,
		sports,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
