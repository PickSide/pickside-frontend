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
		setLocale: (state, action: PayloadAction<AppLocal>) => (state = action.payload),
	},
})

export const { setLocale } = AppLocal.actions

export default AppLocal.reducer
