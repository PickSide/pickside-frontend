import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { fetchItems } from 'api'

export interface User {
	id?: string
	firstName?: string
	lastName?: string
	email?: string
	sexe?: 'male' | 'female'
	level?: number
	reliability?: number
	matchPlayed?: number
	matchOrganized?: number
	localeRegion?: string
}

const User = createSlice({
	initialState: null as unknown as User,
	name: 'user',
	reducers: {
		setConnectedUser: (state, action: PayloadAction<User>) => (state = action.payload),
	},
})

export const { setConnectedUser } = User.actions

export const connectToPlatform =
	(data: any) =>
	async (dispatch: Dispatch): Promise<any> => {
		const item = await fetchItems({
			endpoint: 'auth/login',
			method: 'POST',
			data,
		})(dispatch)

		if (item) {
			dispatch(setConnectedUser(item))
		}
	}

export default User.reducer
