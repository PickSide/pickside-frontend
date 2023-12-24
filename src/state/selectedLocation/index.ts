import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const SelectedLocationReducer = createSlice({
	initialState: null as unknown as {},
	name: 'selectedLocation',
	reducers: {
		setSelectedLocation: (state, action: PayloadAction<any>) => (state = action.payload),
	},
})

export const { setSelectedLocation } = SelectedLocationReducer.actions

export default SelectedLocationReducer.reducer
