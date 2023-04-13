import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Locales {
	results?: Locale[]
}

export interface Locale {
	id?: string
	value?: string
	description?: string
	flagCode?: string
}

const Locales = createSlice({
	initialState: null as unknown as Locales,
	name: 'locales',
	reducers: {
		setLocales: (state, action: PayloadAction<Locales>) => (state = action.payload),
	},
})

export const { setLocales } = Locales.actions

export default Locales.reducer
