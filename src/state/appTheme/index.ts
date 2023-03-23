import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppTheme {
	theme?: 'dark' | 'light'
}

const AppConfig = createSlice({
	initialState: {
		theme: 'light',
	} as AppTheme,
	name: 'appConfig',
	reducers: {
		setAppTheme: (state, action: PayloadAction<AppTheme>) => (state = { ...state, ...action.payload }),
	},
})

export const { setAppTheme } = AppConfig.actions

export default AppConfig.reducer
