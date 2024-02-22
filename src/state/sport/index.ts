import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Resources } from '@state'

export interface Sports extends Resources {
	results?: Sport[]
}
export interface Sport {
	id: string
	name: string
	gameModes: string[]
	featureAvailable: boolean
}

export interface Mode {
	value: string
	name: string
	description: string
	defaultMaxPlayers: number
}

const SportReducer = createSlice({
	initialState: null as unknown as Sports,
	name: 'sports',
	reducers: {
		setSports: (state, action: PayloadAction<Sports>) => (state = action.payload),
	},
})

export const { setSports } = SportReducer.actions

export default SportReducer.reducer
