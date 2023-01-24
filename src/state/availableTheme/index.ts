import { PaletteMode } from '@mui/material'
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'

export interface AppTheme {
	value?: PaletteMode
	description?: string
}

export interface AvailableThemes {
	results: AppTheme[]
}

const AvailableTheme = createSlice({
	initialState: {} as AvailableThemes,
	name: 'availableTheme',
	reducers: {
		setAvailableThemes: (state, action: PayloadAction<AvailableThemes>) => (state = action.payload),
	},
})

export const { setAvailableThemes } = AvailableTheme.actions

export const fetchAvailableThemes =
	() =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		const items = await fetchItems({
			endpoint: 'themes',
		})(dispatch)

		if (items) {
			dispatch(setAvailableThemes(items))
		}
	}

export default AvailableTheme.reducer
