import activities, { Activity } from './activity'
import appConfig, { AppConfig } from './config'
import user, { User } from './user'

export interface AppState {
	activities?: Activity[]
	appConfig?: AppConfig
	connectedUser?: User
}

export const reducers = {
	activities,
	appConfig,
	connectedUser: user,
}
