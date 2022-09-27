import user, { User } from 'state/user'

export interface AppState {
	user?: User
}

export const reducers = {
	user,
}
