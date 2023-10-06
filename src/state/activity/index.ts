import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, Sport, User } from '@state'

export interface Activities extends Resources {
	results?: Activity[]
}

export interface Activity {
	id?: string
	address: any
	date: Date
	description: string
	duration: number
	maxPlayers: number
	mode: string
	organiser: User
	participants: User[]
	recommandedLevel: string
	rules: string
	sport: Sport
	time: Date
	title: string
	price: number
}

const Activity = createSlice({
	initialState: null as unknown as Activities,
	name: 'activities',
	reducers: {
		addActivity: (state, action: PayloadAction<Activity>) => {
			if (state.results) {
				state.results = [...state.results, action.payload]
			}
			return state
		},
		updateActivity: (state, action: PayloadAction<any>) => {
			const idx = state.results?.findIndex((Activity) => Activity.id === action.payload.id) || -1

			if (idx > -1) {
				state.results?.splice(idx, 1, action.payload)
			}
			return state
		},
		updateParticipants: (state, action: PayloadAction<{ activityId: string; participants: any[] }>) => {
			const idx = state.results?.findIndex((Activity) => Activity.id === action.payload.activityId) || -1

			if (idx > -1 && state.results && action.payload.participants) {
				state.results[idx].participants = action.payload.participants
			}
			return state
		},
		setActivities: (state, action: PayloadAction<Activities>) => (state = { ...state, ...action.payload }),
	},
})

export const { addActivity, updateActivity, updateParticipants, setActivities } = Activity.actions

export default Activity.reducer
