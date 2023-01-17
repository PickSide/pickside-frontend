import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { AppConfig } from 'state/config'

interface UseGlobalConfigOutput extends Omit<AppConfig, 'darkModeEnabled'> {
	theme?: 'dark' | 'light'
}

const useGlobalConfig = () => {
	const appConfig = useSelector((state: AppState) => state.appConfig)
	//const connectedUser = useSelector((state: AppState) => state.connectedUser)
	const [globalConfig, setGlobalConfig] = useState<UseGlobalConfigOutput>({})

	useEffect(() => {
		if (appConfig) {
			setGlobalConfig({ ...appConfig, theme: appConfig.darkModeEnabled ? 'dark' : 'light' })
		}
	}, [appConfig])

	return globalConfig
}

export default useGlobalConfig
