import { useEffect, useState } from 'react'

type Environment = 'local' | 'dev' | 'prod'

const useEnvVariables = () => {
	return {
		googleAPIKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
	}
}

export default useEnvVariables
