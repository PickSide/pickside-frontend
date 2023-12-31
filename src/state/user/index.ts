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
	favorites?: any[]
	fitnessLevel?: 'retired' | 'average' | 'athletic' | 'very athletic'
	fullName?: string
	groups?: Group[]
	id?: string
	inactive?: boolean
	inactiveDate?: Date
	joinDate?: string
	localeRegion?: string
	locationCommonlyPlayedIn?: string
	locationTracking?: boolean
	matchOrganizedCount?: number
	matchPlayedCount?: number
	phone?: string
	permissions?: [USER_PERMISSIONS]
	preferredLocale?: Locale
	preferredRegion?: google.maps.places.PlaceResult
	preferredSport?: Sport
	preferredTheme?: 'light' | 'dark'
	profilePrivacy?: {
		allowLocationTracking?: boolean
		showAge?: boolean
		showEmail?: boolean
		showPhone?: boolean
		showGroups?: boolean
	}
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
	name: 'user',
	reducers: {
		setUser: (state, action: PayloadAction<User | null | undefined>) => (state = action.payload),
		setCachedUser: (state, action: PayloadAction<User | null | undefined>) => (state = action.payload),
		updateUserConfig: (state, action: PayloadAction<any>) => state = { ...state, ...action.payload },
		updateUserFavorites: (state, action: PayloadAction<any>) => {
			if (state && action.payload.result.favorites) {
				state.favorites = action.payload.result.favorites
			}
			return state
		},
	},
})

export const { setUser, setCachedUser, updateUserConfig, updateUserFavorites } = UserReducer.actions

export default UserReducer.reducer
