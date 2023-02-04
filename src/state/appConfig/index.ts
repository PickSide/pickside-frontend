import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import store from 'store'

export interface AppConfig {
	theme?: string
	lang?: string
}

const AppConfig = createSlice({
	initialState: {
		theme: 'light',
		lang: 'en',
	} as AppConfig,
	name: 'appConfig',
	reducers: {
		setAppConfig: (state, action: PayloadAction<AppConfig>) => (state = { ...state, ...action.payload }),
	},
})

export const { setAppConfig } = AppConfig.actions

export const changeTheme =
	(theme?: string) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		if (theme) {
			dispatch(setAppConfig({ theme }))
		} else {
			const currentTheme = store.getState().appConfig.theme
			dispatch(setAppConfig({ theme: currentTheme === 'light' ? 'dark' : 'light' }))
		}
	}

export const changeLanguage =
	(lang?: string) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		if (lang) {
			dispatch(setAppConfig({ lang }))
		}
	}

export default AppConfig.reducer
