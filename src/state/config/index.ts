import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'
import store from 'store'
import { Coordinates } from 'types'

export interface AppConfig {
	darkModeEnabled?: boolean
	locale?: string
	connctedUserLocation?: Coordinates
}

const User = createSlice({
	initialState: null as unknown as AppConfig,
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
			endpoint: connectedUser?.id ? `config/${connectedUser?.id}` : 'config',
			method: 'GET',
		})(dispatch)

		if (items) {
			dispatch(setAppConfig(items))
		}
	}

export const updateAppConfiguration =
	(data: AppConfig) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		if (data) {
			dispatch(setAppConfig(data))
		}
	}

export default User.reducer
