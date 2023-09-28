import { configureStore } from '@reduxjs/toolkit'
import { reducers } from '@state'
import { toastMiddleware } from '@middlewares'

const additionalMiddlewares = [toastMiddleware]

export const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(additionalMiddlewares),
	preloadedState: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
