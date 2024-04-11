import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, User } from '@state'

export interface Groups extends Resources {
	results?: Group[]
}

export interface Group {
	id?: string
	region: google.maps.places.PlaceResult
	coverPhoto?: string
	description?: string
	members?: User[]
	name?: string
	organizer?: User
	requireApproval?: boolean
	sport: string
	visibility: 'public' | 'private'
}

const GroupReducer = createSlice({
	initialState: { results: [] } as Groups,
	name: 'groups',
	reducers: {
		addGroup: (state, action: PayloadAction<Group>) => {
			state.results = state.results ? [...state.results, action.payload] : [action.payload]
		},
		removeGroup: (state, action: PayloadAction<string>) => {
			if (state.results) {
				state.results = state.results.filter((group) => group.id !== action.payload)
			}
			return state
		},
		setGroups: (state, action: PayloadAction<Groups>) => (state = { ...state, ...action.payload }),
	},
})

export const { addGroup, removeGroup, setGroups } = GroupReducer.actions

export default GroupReducer.reducer
