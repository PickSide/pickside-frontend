import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { AppState } from 'state'
import { useSelector } from 'react-redux'

export interface AppThemeContextProps {
	children?: ReactNode
}

const AppThemeContext = createContext<AppThemeContextProps>({})

export const useThemeContext = () => useContext(AppThemeContext)

export const AppThemeProvider: FC<any> = ({ children }) => {
	const user = useSelector((state: AppState) => state.user)
	const appTheme = useSelector((state: AppState) => state.appTheme)
	const [currentThemeClass, setCurrentThemeClass] = useState<any>(user?.preferredTheme || 'light')

	useEffect(() => window.document.documentElement.classList.add(currentThemeClass), [])

	useEffect(() => {
		if (appTheme) {
			const root = window.document.documentElement
			root.classList.remove(currentThemeClass)
			root.classList.add(appTheme)
			setCurrentThemeClass(appTheme)
		}
	}, [appTheme])

	return <AppThemeContext.Provider value={{}}>{children}</AppThemeContext.Provider>
}

export default AppThemeContext
