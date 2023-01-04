import { useContext, useEffect, useState } from 'react'
import { AppContext, darkModeMapStyles, lightModeMapStyles } from 'utils'
import { useMode } from 'hooks/useMode'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

const useMapStyles = (): { mapStyles } => {
	const appConfig = useSelector((state: AppState) => state.appConfig)
	const [mapStyles, setMapStyles] = useState<any>([])

	useEffect(() => {
		if (appConfig) {
			if (appConfig.darkModeEnabled) {
				setMapStyles(darkModeMapStyles)
			} else {
				setMapStyles(lightModeMapStyles)
			}
		}
	}, [appConfig])

	return { mapStyles }
}

export default useMapStyles
