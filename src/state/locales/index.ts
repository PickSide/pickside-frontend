import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'

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

export const fetchLocales =
	() =>
		async (dispatch: Dispatch): Promise<any> => {
			const items = await fetchItems({
				endpoint: 'locales',
				secure: false
			})(dispatch)

			if (items) {
				dispatch(setLocales(items))
			}
		}

export const fetchSupportedLanguages =
	() =>
		async (dispatch: Dispatch): Promise<any> => {
			const items = await fetchItems({
				endpoint: 'languages',
			})(dispatch)

			if (items) {
				dispatch(setLocales(items))
			}
		}

export default Locales.reducer
