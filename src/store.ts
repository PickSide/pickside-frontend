import { authMiddleware, toastMiddleware } from '@middlewares'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { reducers } from '@state'

const middleware = [
	...getDefaultMiddleware({
		serializableCheck: false,
	}),
	authMiddleware,
	toastMiddleware
]

export const store = configureStore({
	reducer: reducers,
	middleware,
	preloadedState: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
