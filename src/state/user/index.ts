import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

export interface User {
	id?: string
	firstName?: string
	lastName?: string
	email?: string
	sexe?: 'male' | 'female'
	level?: 1 | 2 | 3 | 4 | 5
	reliability?: number
	matchPlayed?: number
	matchOrganized?: number
	darkMode?: boolean
}

const User = createSlice({
	initialState: null as unknown as User | null,
	name: 'user',
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => (state = action.payload),
	},
})

export const { setUser } = User.actions

export const fetchUser =
	(credentials: any) =>
	async (dispatch: Dispatch): Promise<any> => {}

export default User.reducer
