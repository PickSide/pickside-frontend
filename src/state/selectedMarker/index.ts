import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarkerState } from 'types'

const Sport = createSlice({
	initialState: null as unknown as MarkerState,
	name: 'selectedMarker',
	reducers: {
		setSelectedMarker: (state, action: PayloadAction<any>) => (state = action.payload),
	},
})

export const { setSelectedMarker } = Sport.actions

export default Sport.reducer
