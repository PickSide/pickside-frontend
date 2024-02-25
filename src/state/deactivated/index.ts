import { createSlice } from '@reduxjs/toolkit'

const DeactivatedAccountReducer = createSlice({
	initialState: false,
	name: 'deactivate',
	reducers: {
		deactivate: (state) => (state = true),
	},
})

export const { deactivate } = DeactivatedAccountReducer.actions

export default DeactivatedAccountReducer.reducer
