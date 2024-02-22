import { ACCOUNT_TYPE, ROLES, USER_PERMISSIONS } from './constants'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Group } from '../groups'
import { Locale } from '../locales'
import { Sport } from '../sport'

export interface User {
	accountType?: ACCOUNT_TYPE
	address?: string
	attendedEventsCount?: number
	avatar?: any
	bio?: string
	city?: string
	email?: string
	emailVerified?: boolean
	favorites?: string
	fitnessLevel?: 'retired' | 'average' | 'athletic' | 'very athletic'
	fullName?: string
	groups?: Group[]
	id?: string
	inactive?: boolean
	inactiveDate?: Date
	joinDate?: string
	localeRegion?: string
	matchOrganizedCount?: number
	matchPlayedCount?: number
	phone?: string
	permissions?: [USER_PERMISSIONS]
	allowLocationTracking?: boolean
	preferredLocale?: Locale
	preferredRegion?: google.maps.places.PlaceResult
	preferredSport?: Sport
	preferredTheme?: 'light' | 'dark'
	showAge?: boolean
	showEmail?: boolean
	showPhone?: boolean
	showGroups?: boolean
	reasonsForJoining?: string[]
	reliability?: number
	role?: ROLES
	sexe?: 'male' | 'female'
	socialNetworks?: any[]
	subscriptionType?: string
	timezone?: string
	username?: string
	zip?: string
}

const UserReducer = createSlice({
	initialState: null as unknown as User | null | undefined,
	name: 'me',
	reducers: {
		setMe: (state, action: PayloadAction<User | null | undefined>) => (state = action.payload),
		updateMeConfig: (state, action: PayloadAction<any>) => state = { ...state, ...action.payload },
		updateMeFavorites: (state, action: PayloadAction<any>) => {
			if (state && action.payload.result) {
				state.favorites = action.payload.result
			}
			return state
		},
	},
})

export const { setMe, updateMeConfig, updateMeFavorites } = UserReducer.actions

export default UserReducer.reducer
