import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'state/user'
import { ActivityEvent } from 'types'
import { store } from '../../store'

export interface Activity extends ActivityEvent {
	id?: string
	levelRequired?: any
	maxPlayersCapacity: number
	numberOfRegisteredPlayers: number
	organiser?: User
	registeredUserIds?: string[]
	title?: string
}

const Activity = createSlice({
	initialState: null as unknown as Activity[],
	name: 'activity',
	reducers: {
		setActivites: (state, action: PayloadAction<Activity[]>) => (state = [...state, ...action.payload]),
		registerNewUser: (state, action: PayloadAction<{ eventId: any; connectedUserId: any }>) => {
			console.group(action.payload)
			const updatedEvent = state.find((activity) => activity.id === action.payload.eventId)
			const oldEventIdx = state.findIndex((activity) => activity.id === action.payload.eventId)
			if (updatedEvent) {
				updatedEvent.registeredUserIds?.push(action.payload.connectedUserId)
				updatedEvent.numberOfRegisteredPlayers = updatedEvent.numberOfRegisteredPlayers + 1
				state.splice(oldEventIdx, 1, updatedEvent)
			}
			return state
		},
	},
})

export const { registerNewUser, setActivites } = Activity.actions

export const fetchActivites =
	(credentials: any) =>
	async (dispatch: Dispatch): Promise<any> => {}

export const registerPlayerToActivityEvent =
	(eventId: any) =>
	async (dispatch: Dispatch): Promise<any> => {
		const connectedUserId = store.getState().connectedUser.id

		dispatch(registerNewUser({ eventId, connectedUserId }))
	}

export default Activity.reducer
