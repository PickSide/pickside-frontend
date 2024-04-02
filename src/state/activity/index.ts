import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, Sport, User } from '@state'

export interface Activities extends Resources {
	results?: Activity[]
}

export interface Activity {
	id?: string
	address: string
	date: string
	description: string
	gameMode: string
	lat: number
	lng: number
	maxPlayers: number
	price: number
	rules: string
	time: Date
	title: string
	organizer: User
	participants: User[]
	sport: Sport
}

const ActivityReducer = createSlice({
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
			if (state.results) {
				const idx = state.results.findIndex((Activity) => Activity.id === action.payload.id) || -1

				if (idx > -1) {
					state.results?.splice(idx, 1, action.payload)
				}
			}
			return state
		},
		updateParticipants: (state, action: PayloadAction<{ activityId: string; participants: any[] }>) => {
			if (state.results) {
				const idx = state.results.findIndex((activity) => activity.id === action.payload.activityId)

				if (idx > -1) {
					state.results[idx].participants = action.payload.participants
				}
			}
			return state
		},
		setActivities: (state, action: PayloadAction<Activities>) => (state = { ...state, ...action.payload }),
	},
})

export const { addActivity, updateActivity, updateParticipants, setActivities } = ActivityReducer.actions

export default ActivityReducer.reducer
