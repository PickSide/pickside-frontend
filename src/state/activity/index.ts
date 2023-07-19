import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, Sport, User } from 'state'

import dayjs from 'dayjs'
import moment from 'moment'

export interface Activities extends Resources {
	results?: Activity[]
}

export interface Activity {
	id?: string
	address: string
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
