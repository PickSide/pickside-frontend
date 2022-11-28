import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarkerActivity } from 'state/marker'

const Sport = createSlice({
	initialState: null as unknown as MarkerActivity,
	name: 'selectedMarker',
	reducers: {
		setSelectedMarker: (state, action: PayloadAction<any>) => (state = action.payload),
	},
})

export const { setSelectedMarker } = Sport.actions

export default Sport.reducer
