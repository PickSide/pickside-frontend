import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventLocation } from 'state/eventLocation'

const SelectedEvent = createSlice({
	initialState: null as unknown as EventLocation,
	name: 'selectedEvent',
	reducers: {
		setSelectedEvent: (state, action: PayloadAction<any>) => (state = action.payload),
	},
})

export const { setSelectedEvent } = SelectedEvent.actions

export default SelectedEvent.reducer
