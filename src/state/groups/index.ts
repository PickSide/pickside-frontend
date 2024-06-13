import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Resources, User } from '@state'

export interface Groups extends Resources {
	result?: Group[]
}

export interface Group {
	id?: string
	region: google.maps.places.PlaceResult
	coverPhoto?: string
	description?: string
	members?: User[]
	name?: string
	organizerId?: string
	organizer?: User
	invitationStatus?: 'accepted' | 'pending' | 'declined'
	isOrganizer?: boolean
	visibility: 'public' | 'private'
}

const GroupReducer = createSlice({
	initialState: { result: [] } as Groups,
	name: 'groups',
	reducers: {
		addGroup: (state, action: PayloadAction<Group>) => {
			state.result = state.result ? [...state.result, action.payload] : [action.payload]
		},
		removeGroup: (state, action: PayloadAction<string>) => {
			if (state.result) {
				state.result = state.result.filter((group) => group.id !== action.payload)
			}
			return state
		},
		setGroups: (state, action: PayloadAction<Groups>) => (state = { ...state, ...action.payload }),
	},
})

export const { addGroup, removeGroup, setGroups } = GroupReducer.actions

export default GroupReducer.reducer
