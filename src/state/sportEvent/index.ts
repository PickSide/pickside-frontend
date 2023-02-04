import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'state/user'
import { Sport } from 'state/sport'
import { Location } from 'types'
import { fetchItems, updateItem } from 'api'
import store from 'store'

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
	organiser?: User
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
		registerNewUser: (state, action: PayloadAction<{ eventId: any; userId: any }>) => {
			const eventToUpdate = state.results?.find((sportEvent) => sportEvent.id === action.payload.eventId)
			const eventIdx = state.results?.findIndex((sportEvent) => sportEvent.id === action.payload.eventId) || -1
			if (eventToUpdate && eventIdx > -1) {
				eventToUpdate.participants?.push(action.payload.userId)
				state.results?.splice(eventIdx, 1, eventToUpdate)
			}
			return state
		},
	},
})

export const { registerNewUser, setEvents } = SportEvent.actions

export const fetchEvents =
	() =>
	async (dispatch: Dispatch): Promise<any> => {
		const items = await fetchItems({
			endpoint: 'events',
		})(dispatch)

		if (items) {
			dispatch(setEvents(items))
		}
	}

export const registerPlayerToSportEvent =
	(eventId: any) =>
	async (dispatch: Dispatch): Promise<any> => {
		const userId = store.getState().connectedUser?.id
		const updatedItem = await updateItem({
			endpoint: 'events',
			id: eventId,
			data: { userId },
		})(dispatch)
		console.log(updatedItem)
		if (updatedItem) {
			dispatch(registerNewUser({ eventId, userId }))
		}
	}

export const registerSportEvent =
	(data: any) =>
	async (dispatch: Dispatch): Promise<any> => {
		const userId = store.getState().connectedUser?.id
		const updatedItem = await updateItem({
			endpoint: 'events',
			method: 'POST',
			data: { ...data, ...{ organiser: userId } },
		})(dispatch)

		if (updatedItem) {
			dispatch(setEvents(data))
		}
	}

export default SportEvent.reducer
