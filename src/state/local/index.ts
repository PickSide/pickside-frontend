import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Local {
	lang?: string
}

const AppConfig = createSlice({
	initialState: {
		lang: 'en',
	} as Local,
	name: 'appConfig',
	reducers: {
		setLocal: (state, action: PayloadAction<Local>) => (state = { ...state, ...action.payload }),
	},
})

export const { setLocal } = AppConfig.actions

export default AppConfig.reducer
