import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { Coordinates } from 'types'

export interface AppConfig {
	darkModeOn?: boolean
	language?: string
	location?: Coordinates
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
	(data: AppConfig = {}) =>
	async (dispatch: Dispatch): Promise<any> => {
		if (data) {
			setAppConfig(data)
		}
	}
export const updateAppConfiguration =
	(data: AppConfig = {}) =>
	async (dispatch: Dispatch): Promise<any> => {
		fetch('http://example.com/movies.json')
			.then((response) => response.json())
			.then((data) => console.log(data))
		if (data) {
			dispatch(setAppConfig(data))
		}
	}

export default User.reducer
