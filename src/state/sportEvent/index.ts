import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'state/user'
import { Sport } from 'state/sport'
import { Location } from 'types'
import { createItem, fetchItems, updateItem } from 'api'
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
		addEvent: (state, action: PayloadAction<SportEvent>) => { state.results = [...(state.results || []), action.payload] },
		updateEvent: (state, action: PayloadAction<SportEvent>) => {
			console.log(action.payload)
			const idx = state.results?.findIndex(event => event.id === action.payload.id) || -1

			if (idx > -1) {
				state.results?.splice(idx, 1, action.payload)
			}
			return state
		},
	},
})

export const { addEvent, updateEvent, setEvents } = SportEvent.actions

export const createEvent =
	(data: any) =>
		async (dispatch: Dispatch): Promise<any> => {
			const userId = store.getState().connectedUser?.id
			const updatedItem = await createItem({
				endpoint: 'events',
				data: { ...data, ...{ organiser: userId } },
				secure: false
			})(dispatch)

			if (updatedItem) {
				dispatch(addEvent({ ...data, id: updatedItem.response.id }))
			}
		}

export const fetchEvents =
	() =>
		async (dispatch: Dispatch): Promise<any> => {
			const data = await fetchItems({
				endpoint: 'events',
				secure: false
			})(dispatch)

			if (data) {
				dispatch(setEvents(data))
			}
		}

export const register =
	(event: SportEvent) =>
		async (dispatch: Dispatch): Promise<any> => {
			const userId = store.getState().connectedUser?.id
			const updatedItem = await updateItem({
				endpoint: 'events',
				id: event.id,
				data: { userId },
				secure: false
			})(dispatch)

			if (updatedItem) {
				dispatch(updateEvent(updatedItem.data.response))
			}
		}



export default SportEvent.reducer
