import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Resources } from '@state'

export interface Locales extends Resources {
	result?: Locale[]
}

export interface Locale {
	id: string
	name: string
	value: string
	flagCode: string
}

const LocalesReducer = createSlice({
	initialState: null as unknown as Locales,
	name: 'locales',
	reducers: {
		setLocales: (state, action: PayloadAction<Locales>) => (state = action.payload),
	},
})

export const { setLocales } = LocalesReducer.actions

export default LocalesReducer.reducer
