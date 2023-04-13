import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sport } from 'state/sport'
import { Location } from 'types'

export interface SportEvents {
	results?: SportEvent[]
}

export interface SportEvent {
	id?: string
	free?: boolean
	levelRequired?: any
	location: Location
	maxPlayersCapacity: number
	numberOfRegisteredPlayers: number
	organiser?: string
	participants?: string[]
	pricePerUnit?: number
	registeredUserIds?: string[]
	title?: string
	type?: Sport
}

const SportEvent = createSlice({
	initialState: null as unknown as SportEvents,
	name: 'sportEvents',
	reducers: {
		setEvents: (state, action: PayloadAction<SportEvents>) => (state = { ...state, ...action.payload }),
		addEvent: (state, action: PayloadAction<SportEvent>) => { state.results = [...(state.results || []), action.payload] },
		updateEvent: (state, action: PayloadAction<SportEvent>) => {
			const idx = state.results?.findIndex(event => event.id === action.payload.id) || -1

			if (idx > -1) {
				state.results?.splice(idx, 1, action.payload)
			}
			return state
		},

	},
})

export const { addEvent, updateEvent, setEvents } = SportEvent.actions

export default SportEvent.reducer
