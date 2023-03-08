import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems, updateItem } from 'api'
import store from 'store'
import { AppTheme } from 'state/availableTheme'

export interface UserConfig {
	allowLocationTracking?: boolean
	defaultTheme?: AppTheme
	currentTheme?: string
	defautltLocation?: string
	locale?: string
	userId?: string
}

const UserConfig = createSlice({
	initialState: null as unknown as UserConfig,
	name: 'userConfig',
	reducers: {
		setUserConfig: (state, action: PayloadAction<UserConfig>) => (state = { ...state, ...action.payload }),
	},
})

export const { setUserConfig } = UserConfig.actions

export const fetchUserConfiguration =
	() =>
		async (dispatch: Dispatch): Promise<any> => {
			const connectedUser = store.getState().connectedUser
			const items = await fetchItems({
				endpoint: 'configs',
				id: connectedUser?.id,
			})(dispatch)

			if (items) {
				dispatch(setUserConfig({ ...items, currentTheme: items.defaultTheme }))
			}
		}

export const updateUserConfiguration =
	(data: UserConfig) =>
		async (dispatch: Dispatch<any>): Promise<any> => {
			const connectedUser = store.getState().connectedUser
			const updatedItem = await updateItem({
				endpoint: 'configs',
				id: connectedUser?.id,
				data,
			})(dispatch)

			if (updatedItem) {
				dispatch(setUserConfig(updatedItem))
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
export default UserConfig.reducer
