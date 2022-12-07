import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export interface Sports {
	results?: Sport[]
}
export interface Sport {
	id?: string
	value?: string
	description?: string
}

const Sport = createSlice({
	initialState: null as unknown as Sports,
	name: 'sports',
	reducers: {
		setSports: (state, action: PayloadAction<Sports[]>) => (state = tempArray),
	},
})

export const { setSports } = Sport.actions

export const fetchAllSports =
	(data: Sports[]) =>
	async (dispatch: Dispatch): Promise<any> => {
		if (data) {
			setSports(data)
		}
	}

export default Sport.reducer

const tempArray = {
	results: [
		{
			id: uuidv4(),
			value: 'soccer',
			description: 'Soccer',
		},
		{
			id: uuidv4(),
			value: 'basketball',
			description: 'Basketball',
		},
		{
			id: uuidv4(),
			value: 'afootball',
			description: 'American Football',
		},
		{
			id: uuidv4(),
			value: 'tennis',
			description: 'Tennis',
		},
	],
} as Sports
