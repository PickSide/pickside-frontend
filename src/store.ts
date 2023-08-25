import { authMiddleware, toastMiddleware } from '@middlewares'

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { reducers } from '@state'

const additionalMiddlewares = [authMiddleware, toastMiddleware]

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddlewares),
	preloadedState: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
