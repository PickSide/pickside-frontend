import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SportEvents } from 'state/sportEvent'

export interface RegionEvents {
	results: RegionEvent[]
}

export interface RegionEvent {
	id?: string
	description?: string
	events: SportEvents
}

const RegionEvent = createSlice({
	initialState: null as unknown as RegionEvents,
	name: 'regionEvents',
	reducers: {
		setRegionEvents: (state, action: PayloadAction<RegionEvents>) => (state = action.payload),
	},
})

export const { setRegionEvents } = RegionEvent.actions

export default RegionEvent.reducer
