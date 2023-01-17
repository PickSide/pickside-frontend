import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems, updateItem } from 'api'
import store from 'store'

export interface AppConfig {
	allowLocationTracking?: boolean
	darkModeEnabled?: boolean
	defaultDarkMode?: boolean
	defautltLocation?: string
	locale?: string
	userId?: string
}

const User = createSlice({
	initialState: {
		allowLocationTracking: false,
		darkModeEnabled: false,
		defaultDarkMode: false,
		defautltLocation: 'montreal',
		locale: 'en',
		userId: undefined,
	} as AppConfig,
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
			endpoint: connectedUser?.id ? `configs/${connectedUser?.id}` : 'configs',
		})(dispatch)

		if (items) {
			dispatch(setAppConfig(items))
		}
	}

export const updateAppConfiguration =
	(data: AppConfig) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		const connectedUser = store.getState().connectedUser
		const updatedItem = await updateItem({
			endpoint: `configs/${connectedUser?.id}`,
			data,
		})(dispatch)

		if (updatedItem) {
			dispatch(setAppConfig(updatedItem))
		}
	}

export default User.reducer
