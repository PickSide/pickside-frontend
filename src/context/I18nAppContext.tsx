import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import { AppState } from '@state'
import { useLocaleSwitcher } from '@hooks'
import { useSelector } from 'react-redux'

export interface I18nAppContextProps {
	children?: ReactNode
}

const I18nAppContext = createContext<I18nAppContextProps>({})

export const I18nProvider: FC<any> = ({ children }) => {
	const appLocale = useSelector((state: AppState) => state.appLocale)
	const me = useSelector((state: AppState) => state.user)

	const { handleLocaleChange } = useLocaleSwitcher()
	useEffect(() => {
		handleLocaleChange(appLocale)
	}, [])

	useEffect(() => {
		if (me?.preferredLocale) {
			handleLocaleChange(me.preferredLocale)
		}
	}, [me])

	useEffect(() => {
		if (appLocale) {
			const root = window.document.documentElement
			root.setAttribute('lang', appLocale)
		}
	}, [appLocale])

	return <I18nAppContext.Provider value={{}}>{children}</I18nAppContext.Provider>
}

export default I18nAppContext
