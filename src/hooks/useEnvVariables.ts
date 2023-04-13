interface EnvironmentState {
	development: EnvironmentConfigs
	production: EnvironmentConfigs
	test: EnvironmentConfigs

}

interface EnvironmentConfigs {
	BASE_AUTH_URL: string
	BASE_API_URL: string
	googleAPIKey: string
}

const useEnvVariables = () => {

	const env = process.env.NODE_ENV

	const envState = {
		test: {
			BASE_AUTH_URL: '',
			BASE_API_URL: '',
			googleAPIKey: '',
		},
		development: {
			BASE_AUTH_URL: 'http://localhost:4000',
			BASE_API_URL: 'http://localhost:8000',
			googleAPIKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
		},
		production: {
			BASE_AUTH_URL: '',
			BASE_API_URL: '',
			googleAPIKey: '',
		}
	} as EnvironmentState

	return envState[env]
}

export default useEnvVariables
