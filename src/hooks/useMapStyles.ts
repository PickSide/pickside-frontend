import { darkModeMapStyles, lightModeMapStyles } from '@utils'

import { AppState } from '@state'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useMapStyles = () => {
	const theme = useSelector((state: AppState) => state.appTheme)

	const mapStyles = useMemo(() => (theme === 'dark' ? darkModeMapStyles : lightModeMapStyles), [theme])

	return mapStyles
}

export default useMapStyles
