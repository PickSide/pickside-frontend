import { MarkerProps } from '@react-google-maps/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type MarkerState = Pick<MarkerProps, 'position'>

const Sport = createSlice({
	initialState: null as unknown as MarkerState[],
	name: 'markers',
	reducers: {
		setMapMarkers: (state, action: PayloadAction<MarkerState[]>) => (state = action.payload),
	},
})

export const { setMapMarkers } = Sport.actions

export default Sport.reducer
