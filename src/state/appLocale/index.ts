import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const AppLocal = createSlice({
	initialState: 'en',
	name: 'appLocale',
	reducers: {
		setLocale: (state, action: PayloadAction<string>) => state = action.payload
		,
	},
})

export const { setLocale } = AppLocal.actions

export default AppLocal.reducer
