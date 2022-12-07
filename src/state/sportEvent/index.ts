import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'state/user'
import { Sport } from 'state/sport'
import { Address } from 'types'

export interface SportEvents {
	results?: SportEvent[]
}

export interface SportEvent {
	id?: string
	address?: Address
	free?: boolean
	levelRequired?: any
	locations: google.maps.LatLng
	maxPlayersCapacity: number
	numberOfRegisteredPlayers: number
	organiser?: User
	pricePerUnit?: number
	registeredUserIds?: string[]
	title?: string
	type?: Sport
}

const SportEvent = createSlice({
	initialState: null as unknown as SportEvents,
	name: 'sportEvents',
	reducers: {
		setActivites: (state, action: PayloadAction<SportEvents>) => (state = action.payload),
		registerNewUser: (state, action: PayloadAction<{ eventId: any; connectedUserId: any }>) => {
			const updatedEvent = state.results?.find((sportEvent) => sportEvent.id === action.payload.eventId)
			const oldEventIdx = state.results?.findIndex((sportEvent) => sportEvent.id === action.payload.eventId) || -1
			if (updatedEvent && oldEventIdx > -1) {
				updatedEvent.registeredUserIds?.push(action.payload.connectedUserId)
				updatedEvent.numberOfRegisteredPlayers = updatedEvent.numberOfRegisteredPlayers + 1
				state.results?.splice(oldEventIdx, 1, updatedEvent)
			}
			return state
		},
	},
})

export const { registerNewUser, setActivites } = SportEvent.actions

export const fetchActivites =
	(credentials: any) =>
	async (dispatch: Dispatch): Promise<any> => {}

export const registerPlayerToSportEvent =
	(eventId: any) =>
	async (dispatch: Dispatch): Promise<any> => {}

export default SportEvent.reducer
