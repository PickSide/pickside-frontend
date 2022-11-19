import user, { User } from './user'

export interface AppState {
	user?: User
}

export const reducers = {
	user,
}
