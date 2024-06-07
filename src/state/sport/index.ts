import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Resources } from '@state'

export interface Sports extends Resources {
	result?: Sport[]
}
export interface Sport {
	id: number
	name: string
	gameModes: string
	featureAvailable: boolean
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
