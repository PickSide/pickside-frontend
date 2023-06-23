import { createContext, useContext, FC, ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

export interface I18nAppContextProps {
	children?: ReactNode
}

const I18nAppContext = createContext<I18nAppContextProps>({})

export const useThemeContext = () => useContext(I18nAppContext)

export const AppThemeProvider: FC<any> = ({ children }) => {
	const account = useSelector((state: AppState) => state.account)
	const appLocale = useSelector((state: AppState) => state.appLocale)
	const [currentLocalClass, setCurrentLocalClass] = useState<any>(account?.defaultLanguage || 'en')

	useEffect(() => window.document.documentElement.classList.add(currentLocalClass), [])

	useEffect(() => {
		if (appLocale) {
			const root = window.document.documentElement
			root.classList.remove(currentLocalClass)
			root.classList.add(appLocale)
			setCurrentLocalClass(appLocale)
		}
	}, [appLocale])

	return <I18nAppContext.Provider value={{}}>{children}</I18nAppContext.Provider>
}

export default I18nAppContext
