import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './state'

export const store = configureStore({
	reducer: reducers,
	middleware: (gDM) => gDM(),
	preloadedState: {},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
