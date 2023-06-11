import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Account {
	id?: string
	_id?: string
	email?: string
	username?: string
	password?: string
	firstName: string
	lastName: string
	phone: string
	sexe: 'male' | 'female'
	configs?: IAccountConfigs
}

export interface IAccountConfigs {
	defaultSport?: string
	defaultLanguage: 'fr' | 'en'
	defaultTheme: 'light' | 'dark'
	localeRegion: string
	preferredRegion: string
	matchOrganized: number
	matchPlayed: number
	fitnessLevel: 'retired' | 'average' | 'athletic' | 'very athletic'
	reliability: number
	locationTracking?: boolean
	hideAge: boolean
	hideEmail: boolean
	hidePhone: boolean
	hideUsername: boolean
}


const Account = createSlice({
	initialState: null as unknown as Account | null,
	name: 'account',
	reducers: {
		setAccount: (state, action: PayloadAction<Account | null>) => (state = action.payload),
		updateConfig: (state, action: PayloadAction<any>) => {
			if (state) {
				state.configs = { ...state.configs, ...action.payload }
			}
			return state
		},
	},
})

export const { setAccount, updateConfig } = Account.actions

export default Account.reducer
