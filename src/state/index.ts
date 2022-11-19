import activities, { Activity } from './activity'
import user, { User } from './user'

export interface AppState {
	activities: Activity[]
	user?: User
}

export const reducers = {
	activities,
	user,
}
