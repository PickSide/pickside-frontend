import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { AppState } from '@state'
import { useEffectOnce } from 'usehooks-ts'
import { useSelector } from 'react-redux'

export interface I18nAppContextProps {
	children?: ReactNode
}

const I18nAppContext = createContext<I18nAppContextProps>({})

export const useThemeContext = () => useContext(I18nAppContext)

export const AppThemeProvider: FC<any> = ({ children }) => {
	const user = useSelector((state: AppState) => state.user)
	const appLocale = useSelector((state: AppState) => state.appLocale)
	const [currentLocalClass, setCurrentLocalClass] = useState<any>(user?.preferredLocale || 'en')

	useEffectOnce(() => window.document.documentElement.classList.add(currentLocalClass))

	useEffect(() => {
		if (appLocale) {
			const root = window.document.documentElement
			root.classList.remove(currentLocalClass)
			root.classList.add(appLocale)
			setCurrentLocalClass(appLocale)
		}
	}, [appLocale, currentLocalClass])

	return <I18nAppContext.Provider value={{}}>{children}</I18nAppContext.Provider>
}

export default I18nAppContext
