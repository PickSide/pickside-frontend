import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

import { Area } from '../areas'
import { Locale } from '../locales'
import { Sport } from '../sport'
import { merge } from 'lodash'

export interface User {
	id?: string
	address?: string
	attendedEventsCount?: number
	avatar?: any
	bio?: string
	city?: string
	email?: string
	emailVerified?: boolean
	//eventsRegistered?: Activity[]
	favorites?: any[]
	fullName?: string
	fitnessLevel?: 'retired' | 'average' | 'athletic' | 'very athletic'
	groups?: any[]
	isExternalAccount?: boolean
	isOrganizer?: boolean
	joinDate?: string
	localeRegion?: string
	locationCommonlyPlayedIn?: string
	locationTracking?: boolean
	matchOrganizedCount?: number
	matchPlayedCount?: number
	password?: string
	phone?: string
	preferredLocale?: Locale
	preferredRegion?: Area
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
	sexe?: 'male' | 'female'
	socialNetworks?: any[]
	subscriptionType?: string
	timezone?: string
	username?: string
	zip?: string
}

const User = createSlice({
	initialState: null as unknown as User | null | undefined,
	name: 'user',
	reducers: {
		setUser: (state, action: PayloadAction<User | null | undefined>) => (state = action.payload),
		setCachedUser: (state, action: PayloadAction<User | null | undefined>) => (state = action.payload),
		setUserEmpty: (state) => (state = null),
		updateUserConfig: (state, action: PayloadAction<any>) => {
			if (state) {
				state = { ...state, ...action.payload }
			}
			return state
		},

		updateUserFavorites: (state, action: PayloadAction<any>) => {
			if (state && action.payload.result.favorites) {
				state.favorites = action.payload.result.favorites
			}
			return state
		},
	},
})

export const { setUser, setCachedUser, setUserEmpty, updateUserConfig, updateUserFavorites } = User.actions

export default User.reducer
