import { AppState, Locale, Locales, setLocale } from '@state'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

const useLocaleSwitcher = (): { handleLocaleChange: (locale: any) => void; locales: Locale[] } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()

	const locales = useSelector((state: AppState) => state.locales)

	const [current, setCurrent] = useState<Locale>()

	const handleLocaleChange = useCallback(
		async (locale) => {
			if (locale) {
				dispatch(setLocale(locale))
				i18n.changeLanguage(locale)
				setCurrent(locales?.result?.find((l) => l.value === locale))
			}
		},
		[dispatch, i18n],
	)

	return { handleLocaleChange, locales: locales?.result || [] }
}

export default useLocaleSwitcher
