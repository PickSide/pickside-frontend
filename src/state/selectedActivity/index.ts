import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarkerActivity } from 'state/marker'

const Sport = createSlice({
	initialState: null as unknown as MarkerActivity,
	name: 'selectedMarker',
	reducers: {
		setSelectedActivity: (state, action: PayloadAction<any>) => (state = action.payload),
	},
})

export const { setSelectedActivity } = Sport.actions

export default Sport.reducer
