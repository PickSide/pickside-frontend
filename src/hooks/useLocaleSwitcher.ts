import { AppState, setLocale } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

const useLocaleSwitcher = (): { handleLocaleChange: (locale: any) => void; locales; current } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()

	const current = useSelector((state: AppState) => state.appLocale)
	const locales = useSelector((state: AppState) => state.locales)

	const handleLocaleChange = useCallback(
		async (locale) => {
			if (locale) {
				await dispatch(setLocale(locale))
				i18n.changeLanguage(locale)
			}
		},
		[dispatch, i18n],
	)

	return { handleLocaleChange, locales, current }
}

export default useLocaleSwitcher
