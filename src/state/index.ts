import activities, { Activity } from './activity'
import appConfig, { AppConfig } from './config'
import sports, { SportType } from './sport'
import user, { User } from './user'

export interface AppState {
	activities?: Activity[]
	appConfig?: AppConfig
	connectedUser?: User
	sports?: SportType[]
}

export const reducers = {
	activities,
	appConfig,
	connectedUser: user,
	sports,
}
