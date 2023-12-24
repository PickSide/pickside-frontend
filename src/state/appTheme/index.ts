import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Theme = 'dark' | 'light' | string

const AppConfigReducer = createSlice({
	initialState: 'light' as unknown as Theme,
	name: 'appConfig',
	reducers: {
		setAppTheme: (state, action: PayloadAction<Theme>) => (state = action.payload),
	},
})

export const { setAppTheme } = AppConfigReducer.actions

export default AppConfigReducer.reducer
