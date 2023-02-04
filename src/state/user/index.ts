import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'

export interface User {
	id?: string
	firstName?: string
	lastName?: string
	username?: string
	email?: string
	sexe?: 'male' | 'female'
	level?: number
	reliability?: number
	matchPlayed?: number
	matchOrganized?: number
	localeRegion?: string
	accessToken?: string
}

const User = createSlice({
	initialState: null as unknown as User | null,
	name: 'user',
	reducers: {
		setConnectedUser: (state, action: PayloadAction<User | null>) => (state = action.payload),
	},
})

export const { setConnectedUser } = User.actions

export const connectToPlatform =
	(data: any) =>
	async (dispatch: Dispatch): Promise<any> => {
		const item = await fetchItems({
			endpoint: 'auth',
			method: 'POST',
			type: 'AUTH',
			data,
		})(dispatch)
		console.log(item)
		if (item) {
			const { accessToken, connectedUser } = item

			dispatch(setConnectedUser(connectedUser))

			return { accessToken, connectedUser }
		}
	}

export const disconnectUser =
	() =>
	async (dispatch: Dispatch): Promise<any> => {
		dispatch(setConnectedUser(null))
	}

export default User.reducer
