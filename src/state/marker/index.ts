import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MarkerActivity extends google.maps.LatLng {
	activityId: string
	selected?: boolean
}

const Marker = createSlice({
	initialState: null as unknown as MarkerActivity[],
	name: 'markers',
	reducers: {
		setMapMarkers: (state, action: PayloadAction<MarkerActivity[] | any>) => action.payload,
		setSelectedMarker: (state, action: PayloadAction<MarkerActivity | any>) => {
			unSelectAll(state)
			state.filter((x) => x.activityId === action.payload)[0].selected = true
			return state
		},
	},
})

export const { setMapMarkers, setSelectedMarker } = Marker.actions

export default Marker.reducer

const unSelectAll = (markers: MarkerActivity[]) => {
	markers.forEach((marker) => (marker.selected = false))
}
