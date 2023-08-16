import { darkModeMapStyles, lightModeMapStyles } from '@utils'
import { useEffect, useState } from 'react'

import { AppState } from '@state'
import { useSelector } from 'react-redux'

const useMapStyles = (): { mapStyles } => {
	const theme = useSelector((state: AppState) => state.appTheme)

	const [mapStyles, setMapStyles] = useState<any>([])

	useEffect(() => {
		if (theme) {
			if (theme === 'dark') {
				setMapStyles(darkModeMapStyles)
			} else {
				setMapStyles(lightModeMapStyles)
			}
		}
	}, [theme])

	return { mapStyles }
}

export default useMapStyles
