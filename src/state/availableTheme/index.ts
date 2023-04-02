import { PaletteMode } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export default AvailableTheme.reducer
