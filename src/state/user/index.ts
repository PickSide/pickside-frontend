import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
	emailVerified: boolean
	eventsRegistered?: any[]
	firstName?: string
	fitnessLevel?: 'retired' | 'average' | 'athletic' | 'very athletic'
	groups?: any[]
	isExternalAccount: boolean,
	isOrganizer?: boolean
	joinDate?: string
	lastName?: string
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
	initialState: null as unknown as User | null,
	name: 'user',
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => (state = action.payload),
		logout: (state) => (state = null),
		updateConfig: (state, action: PayloadAction<any>) => {
			if (state) {
				console.log(action.payload)
				state = merge(state, action.payload)
			}
			return state
		},
	},
})

export const { setUser, logout, updateConfig } = User.actions

export default User.reducer
