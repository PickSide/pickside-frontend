

const useEnvVariables = () => {
	return {
		appEnv: process.env.NODE_ENV,
		googleAPIKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
	}
}

export default useEnvVariables
