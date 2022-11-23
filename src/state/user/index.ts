import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

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
}

const User = createSlice({
	initialState: null as unknown as User,
	name: 'user',
	reducers: {
		setUser: (state, action: PayloadAction<User>) => (state = action.payload),
	},
})

export const { setUser } = User.actions

export const fetchUser =
	(credentials: any) =>
	async (dispatch: Dispatch): Promise<any> => {}

export default User.reducer
