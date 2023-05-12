export const MAX_LEVEL = 5

export const SPORT_EVENTS_ID = 'sportEvents'
export const FILTERS = 'filters'

//Local storage keys
export const ACCESS_TOKEN = 'pickside-access-token'
export const REFRESH_TOKEN = 'pickside-refresh-token'
export const CONNECTED_ACCOUNT = 'pickside-account'

export const FULL_NAME_REGEX = /^[A-Za-z]*( [A-Za-z]+)*$/
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

// Env
export const ENV_VARIABLES = {
	development: {
		authURL: 'localhost:4000',
	},
}

export const BREAKPOINTS = {
	xs: '430px',
	sm: '640px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
}
