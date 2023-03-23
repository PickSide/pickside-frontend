import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { createItem } from 'api'

export interface Account {
	id?: string
	sessionUser?: ConnectedUser
	defaultSport?: string
	darkModeDefault?: boolean
	locationTracking?: boolean
}

export interface ConnectedUser {
	id?: string
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
	groupIds?: string[]
	area?: string
	sexe?: 'male' | 'female'
	eventIds?: string[]
	level?: number
	participated?: number
	organized?: number
}

const Account = createSlice({
	initialState: null as unknown as Account | null,
	name: 'user',
	reducers: {
		setAccount: (state, action: PayloadAction<Account | null>) => (state = action.payload),
	},
})

export const { setAccount } = Account.actions

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
		dispatch(setConnectedUser(null))
	}
