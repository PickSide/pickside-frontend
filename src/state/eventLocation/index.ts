import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EventLocations extends google.maps.LatLng {
	results?: EventLocation[]
}

export interface EventLocation {
	id?: string
	sportEventId: string
	location: google.maps.LatLng
}

const EventLocation = createSlice({
	initialState: null as unknown as EventLocations,
	name: 'eventLocations',
	reducers: {
		setEventLocations: (state, action: PayloadAction<EventLocations>) => (state = action.payload),
	},
})

export const { setEventLocations } = EventLocation.actions

export default EventLocation.reducer
