import { useContext, useEffect, useState } from 'react'
import { AppContext, darkModeMapStyles, lightModeMapStyles } from 'utils'

const useMapStyles = (): { mapStyles } => {
	const context = useContext(AppContext)
	const [mapStyles, setMapStyles] = useState<any>([])

	useEffect(() => {
		if (context.appConfig?.darkModeOn) {
			setMapStyles(darkModeMapStyles)
		} else {
			setMapStyles(lightModeMapStyles)
		}
	}, [context.appConfig?.darkModeOn])

	return { mapStyles }
}

export default useMapStyles
