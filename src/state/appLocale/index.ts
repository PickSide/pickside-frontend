import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const AppLocalReducer = createSlice({
	initialState: 'en',
	name: 'appLocale',
	reducers: {
		setLocale: (state, action: PayloadAction<string>) => (state = action.payload),
	},
})

export const { setLocale } = AppLocalReducer.actions

export default AppLocalReducer.reducer
