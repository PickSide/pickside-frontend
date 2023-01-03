import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducers } from 'state'
import { appConfig, connectedUser, sports, sportEvents } from '../src/testData'

const middleware = [
	...getDefaultMiddleware({
		serializableCheck: false,
	}),
]

export const store = configureStore({
	reducer: reducers,
	middleware,
	preloadedState: {
		//connectedUser,
		appConfig,
		sports,
		sportEvents,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
