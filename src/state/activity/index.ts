import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { Resources, Sport, User } from 'state'

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
		setActivities: (state, action: PayloadAction<Activities>) => (state = { ...state, ...action.payload }),
		addParticipants: (state, action: PayloadAction<{ activityId?: string, userId?: string }>) => {
			if (!action.payload.userId || !action.payload.activityId) return

			const idx = state.results?.findIndex(a => a.id === action.payload.activityId) || -1
			console.log('current', current(state))
			console.log('payload', action.payload.activityId)
			console.log('idx', idx)
			console.log('found it', current(state).results?.some(x => x.id === action.payload.activityId))
			if (state && state.results && idx > -1) {
				state.results[idx].participants.push({ id: action.payload.userId })
			}

			return state
		},
		removeParticipants: (state, action: PayloadAction<{ activityId?: string, userId?: string }>) => {
			if (!action.payload.userId || !action.payload.activityId) return

			const idx = state.results?.findIndex(x => x.id === action.payload.activityId)

			if (state && state.results && idx && idx > -1) {
				const participantIdx = state.results[idx].participants.findIndex(x => x.id === action.payload.userId)
				state.results[idx].participants.splice(participantIdx, 1)
			}

			return state
		},
		updateActivity: (state, action: PayloadAction<Activity>) => {
			const idx = state.results?.findIndex(Activity => Activity.id === action.payload.id) || -1

			if (idx > -1) {
				state.results?.splice(idx, 1, action.payload)
			}
			return state
		},

	},
})

export const { updateActivity, addParticipants, removeParticipants, setActivities } = Activity.actions

export default Activity.reducer
