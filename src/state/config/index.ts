import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'
import store from 'store'

export interface AppConfig {
	darkModeOn?: boolean
	language?: string
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
			endpoint: `user-config/${connectedUser}`,
			method: 'GET',
		})(dispatch)

		if (items) {
			setAppConfig(items)
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
