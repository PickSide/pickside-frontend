import activities, { Activity } from './activity'
import appConfig, { AppConfig } from './config'
import markers from './marker'
import selectedMarker from './selectedMarker'
import sports, { SportType } from './sport'
import user, { User } from './user'

import { MarkerState } from 'types'

export interface AppState {
	activities?: Activity[]
	appConfig?: AppConfig
	connectedUser?: User
	markers?: MarkerState[]
	selectedMarker?: MarkerState
	sports?: SportType[]
}

export const reducers = {
	activities,
	appConfig,
	connectedUser: user,
	markers,
	selectedMarker,
	sports,
}
