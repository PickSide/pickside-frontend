import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

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
	(data: AppConfig) =>
	async (dispatch: Dispatch): Promise<any> => {
		if (data) {
			setAppConfig(data)
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