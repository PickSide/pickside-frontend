import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Locale = 'en' | 'fr'

const AppLocal = createSlice({
	initialState: 'en',
	name: 'appLocale',
	reducers: {
		setLocale: (state, action: PayloadAction<Locale>) => (state = action.payload),
	},
})

export const { setLocale } = AppLocal.actions

export default AppLocal.reducer
