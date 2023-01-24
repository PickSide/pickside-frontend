import { PaletteMode } from '@mui/material'
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems, updateItem } from 'api'
import store from 'store'
import { AppTheme } from 'state/availableTheme'

export interface AppConfig {
	allowLocationTracking?: boolean
	defaultTheme?: AppTheme
	currentTheme?: string
	defautltLocation?: string
	locale?: string
	userId?: string
}

const User = createSlice({
	initialState: {} as AppConfig,
	name: 'appConfig',
	reducers: {
		setAppConfig: (state, action: PayloadAction<AppConfig>) => (state = { ...state, ...action.payload }),
	},
})

export const { setAppConfig } = User.actions

export const fetchAppConfiguration =
	() =>
	async (dispatch: Dispatch): Promise<any> => {
		const connectedUser = store.getState().connectedUser
		const items = await fetchItems({
			endpoint: 'configs',
			id: connectedUser?.id,
		})(dispatch)

		if (items) {
			dispatch(setAppConfig({ ...items, currentTheme: items.defaultTheme }))
		}
	}

export const updateAppConfiguration =
	(data: AppConfig) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		const connectedUser = store.getState().connectedUser
		const updatedItem = await updateItem({
			endpoint: 'configs',
			id: connectedUser?.id,
			data,
		})(dispatch)

		if (updatedItem) {
			dispatch(setAppConfig(updatedItem))
		}
	}

export const lazyFetchThemes =
	() =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		const items = await fetchItems({
			endpoint: 'themes',
		})

		return items || {}
	}
export default User.reducer
