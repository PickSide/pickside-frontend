import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppLocal {
	lang?: string
}

const AppLocal = createSlice({
	initialState: {
		lang: 'en',
	} as AppLocal,
	name: 'appLocale',
	reducers: {
		setLocal: (state, action: PayloadAction<AppLocal>) => (state = { ...state, ...action.payload }),
	},
})

export const { setLocal } = AppLocal.actions

export default AppLocal.reducer
