import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { createItem } from 'api'

export interface Account {
	id?: string
	email?: string
	username?: string
	password?: string
	configs?: IAccountConfigs
	profile?: IAccountProfile
}

export interface IAccountConfigs {
	defaultSport?: string
	darkModeDefault?: boolean
	locationTracking?: boolean
}

export interface IAccountProfile {
	firstName?: string
	lastName?: string
	level?: number
	localeRegion?: string
	matchOrganized?: number
	matchPlayed?: number
	reliability?: number
	sexe?: 'male' | 'female'
}

const Account = createSlice({
	initialState: null as unknown as Account | null,
	name: 'user',
	reducers: {
		setAccount: (state, action: PayloadAction<Account | null>) => (state = action.payload),
	},
})

export const { setAccount } = Account.actions

export default Account.reducer

export const fetchAccountConfiguration =
	(data: any) =>
		async (dispatch: Dispatch): Promise<any> => {
			const item = await createItem({
				endpoint: 'auth',
				data,
				secure: false,
			})(dispatch)
			if (item) {
			}
		}

export const disconnectUser =
	() =>
		async (dispatch: Dispatch): Promise<any> => {
			dispatch(setAccount(null))
		}
