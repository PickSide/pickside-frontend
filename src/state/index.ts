import activities, { Activity } from './activity'
import appConfig, { AppConfig } from './config'
import markers, { MarkerActivity } from './marker'
import selectedMarker from './selectedMarker'
import sports, { SportType } from './sport'
import user, { User } from './user'

export interface AppState {
	activities?: Activity[]
	appConfig?: AppConfig
	connectedUser?: User
	markers?: MarkerActivity[]
	selectedMarker?: MarkerActivity
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
