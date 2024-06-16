import { ACCOUNT_TYPE, ROLES, USER_PERMISSIONS } from './constants'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Locale } from '../locales'
import { Sport } from '../sport'

export interface User {
	id?: any
	acceptedInvitation?: boolean
	accountType?: ACCOUNT_TYPE
	address?: string
	allowLocationTracking?: boolean
	avatar?: any
	bio?: string
	city?: string
	displayName?: string
	email?: string
	emailVerified?: boolean
	exernalId?: string
	fullName?: string
	inactive?: boolean
	inactiveDate?: Date
	invitationStatus?: 'accepted' | 'pending' | 'declined'
	isOrganizer?: boolean
	joinDate?: string
	localeRegion?: string
	matchOrganizedCount?: number
	matchPlayedCount?: number
	permissions?: [USER_PERMISSIONS]
	phone?: string
	preferredLocale?: Locale
	preferredRegion?: google.maps.places.PlaceResult
	preferredSport?: Sport
	preferredTheme?: 'light' | 'dark'
	reasonsForJoining?: string[]
	reliability?: number
	role?: ROLES
	sexe?: 'male' | 'female'
	showAge?: boolean
	showEmail?: boolean
	showGroups?: boolean
	showPhone?: boolean
	timezone?: string
}

const UserReducer = createSlice({
	initialState: null as unknown as User | null | undefined,
	name: 'me',
	reducers: {
		setMe: (state, action: PayloadAction<User | null | undefined>) => (state = action.payload),
		updateMeConfig: (state, action: PayloadAction<any>) => (state = { ...state, ...action.payload }),
	},
})

export const { setMe, updateMeConfig } = UserReducer.actions

export default UserReducer.reducer
