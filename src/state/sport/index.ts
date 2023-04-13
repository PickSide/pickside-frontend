import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
		setSports: (state, action: PayloadAction<Sports>) => (state = action.payload),
	},
})

export const { setSports } = Sport.actions

export default Sport.reducer
