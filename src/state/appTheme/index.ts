import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'dark' | 'light' | string

const AppConfig = createSlice({
	initialState: 'light' as unknown as Theme,
	name: 'appConfig',
	reducers: {
		setAppTheme: (state, action: PayloadAction<Theme>) => (state = action.payload),
	},
})

export const { setAppTheme } = AppConfig.actions

export default AppConfig.reducer
