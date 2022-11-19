import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'components'
import { darkModeMapStyles, lightModeMapStyles } from 'utils'

const useMapStyles = (): { mapStyles } => {
	const context = useContext(AppContext)
	const [mapStyles, setMapStyles] = useState<any>([])

	useEffect(() => {
		if (context.darkMode) {
			setMapStyles(darkModeMapStyles)
		} else {
			setMapStyles(lightModeMapStyles)
		}
	}, [context.darkMode])

	return { mapStyles }
}

export default useMapStyles
