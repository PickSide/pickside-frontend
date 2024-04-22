import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import { AppState } from '@state'
import { useEffectOnce } from 'usehooks-ts'
import { useSelector } from 'react-redux'

export interface I18nAppContextProps {
	children?: ReactNode
}

const I18nAppContext = createContext<I18nAppContextProps>({})

export const I18nProvider: FC<any> = ({ children }) => {
	const appLocale = useSelector((state: AppState) => state.appLocale)
	const me = useSelector((state: AppState) => state.user)
	const [currentLocalClass, setCurrentLocalClass] = useState<any>(me?.preferredLocale || 'en')

	useEffect(() => {
		if (me?.preferredLocale) {
			setCurrentLocalClass(me.preferredLocale)
		}
	}, [])

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
