import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coordinates } from 'types'

export interface LocaleRegions extends google.maps.LatLng {
	results?: LocaleRegion[]
}

export interface LocaleRegion {
	[key: string]: Coordinates
}

const EventLocation = createSlice({
	initialState: null as unknown as LocaleRegions,
	name: 'localeRegions',
	reducers: {
		setLocaleRegions: (state, action: PayloadAction<LocaleRegions>) => (state = action.payload),
	},
})

export const { setLocaleRegions } = EventLocation.actions

export default EventLocation.reducer
