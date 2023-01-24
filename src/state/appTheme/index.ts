import { PaletteMode } from '@mui/material'
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'
import store from 'store'

const AppTheme = createSlice({
	initialState: 'light',
	name: 'appTheme',
	reducers: {
		setAppTheme: (state, action: PayloadAction<string>) => (state = action.payload),
	},
})

export const { setAppTheme } = AppTheme.actions

export const changeTheme =
	(theme?: string) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		if (theme) {
			dispatch(setAppTheme(theme))
		} else {
			const appTheme = store.getState().appTheme
			dispatch(setAppTheme(appTheme === 'light' ? 'dark' : 'light'))
		}
	}

export default AppTheme.reducer
