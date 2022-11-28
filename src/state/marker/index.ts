import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MarkerActivity extends google.maps.LatLng {
	activityId: string
}

const Marker = createSlice({
	initialState: null as unknown as MarkerActivity[],
	name: 'markers',
	reducers: {
		setMapMarkers: (state, action: PayloadAction<MarkerActivity[] | any>) => action.payload,
	},
})

export const { setMapMarkers } = Marker.actions

export default Marker.reducer
