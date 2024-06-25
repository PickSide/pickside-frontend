import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, Sport, User } from '@state'

export interface Activities extends Resources {
	result?: Activity[]
}

export interface Activity {
	id?: string
	address: string
	date: any
	description: string
	duration: string
	endTime?: string
	gameMode: string
	gmapsUrl?: string
	images?: string[]
	lat: number
	lng: number
	maxPlayers: number
	organizer: User
	participants: User[]
	price: number
	rules: string
	sport: Sport
	startTime: any
	title: string
}

const ActivityReducer = createSlice({
	initialState: null as unknown as Activities,
	name: 'activities',
	reducers: {
		addActivity: (state, action: PayloadAction<Activity>) => {
			if (state.result) {
				state.result = [...state.result, action.payload]
			}
			return state
		},
		updateActivity: (state, action: PayloadAction<any>) => {
			if (state.result) {
				const idx = state.result.findIndex((Activity) => Activity.id === action.payload.id) || -1

				if (idx > -1) {
					state.result?.splice(idx, 1, action.payload)
				}
			}
			return state
		},
		updateParticipants: (state, action: PayloadAction<{ activityId: string; participants: any[] }>) => {
			if (state.result) {
				const idx = state.result.findIndex((activity) => activity.id === action.payload.activityId)

				if (idx > -1) {
					state.result[idx].participants = action.payload.participants
				}
			}
			return state
		},
		removeActivity: (state, action: PayloadAction<string>) => {
			if (state.result) {
				state.result = state.result.filter((activity) => activity.id !== action.payload)
			}
			return state
		},
		setActivities: (state, action: PayloadAction<Activities>) => (state = { ...state, ...action.payload }),
	},
})

export const { addActivity, updateActivity, updateParticipants, removeActivity, setActivities } =
	ActivityReducer.actions

export default ActivityReducer.reducer
