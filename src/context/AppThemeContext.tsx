import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

export interface AppThemeContextProps {
	children?: ReactNode
}

const AppThemeContext = createContext<AppThemeContextProps>({})

export const useThemeContext = () => useContext(AppThemeContext)

export const AppThemeProvider: FC<any> = ({ children }) => {
	const account = useSelector((state: AppState) => state.account)
	const appTheme = useSelector((state: AppState) => state.appTheme)
	const [currentThemeClass, setCurrentThemeClass] = useState<any>(account?.defaultTheme || 'light')

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
