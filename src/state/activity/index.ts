import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'state/user'
import { ActivityEvent } from 'types'


export interface Activity extends ActivityEvent {
	id?: string
	title?: string
	organiser?: User
	levelRequired?: any
	registeredPlayers?: number
	maxPlayersCapacity?: number
}

const Activity = createSlice({
	initialState: null as unknown as Activity[],
	name: 'activity',
	reducers: {
		setActivites: (state, action: PayloadAction<Activity[]>) => (state = [...state, ...action.payload]),
	},
})

export const { setActivites } = Activity.actions

export const fetchActivites =
	(credentials: any) =>
	async (dispatch: Dispatch): Promise<any> => {}

export default Activity.reducer
