import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Resources } from 'state'
import { Sport } from 'state/sport'

export interface Activities extends Resources {
	results?: Activity[]
}

export interface Activity {
	id?: string
	free?: boolean
	levelRequired?: any
	location: string
	maxPlayersCapacity: number
	numberOfRegisteredPlayers: number
	organiser?: string
	participants?: string[]
	pricePerUnit?: number
	registeredUserIds?: string[]
	title?: string
	type?: Sport
}

const Activity = createSlice({
	initialState: null as unknown as Activities,
	name: 'sportActivitys',
	reducers: {
		setActivities: (state, action: PayloadAction<Activities>) => (state = { ...state, ...action.payload }),
		addActivity: (state, action: PayloadAction<Activity>) => { state.results = [...(state.results || []), action.payload] },
		updateActivity: (state, action: PayloadAction<Activity>) => {
			const idx = state.results?.findIndex(Activity => Activity.id === action.payload.id) || -1

			if (idx > -1) {
				state.results?.splice(idx, 1, action.payload)
			}
			return state
		},

	},
})

export const { addActivity, updateActivity, setActivities } = Activity.actions

export default Activity.reducer
