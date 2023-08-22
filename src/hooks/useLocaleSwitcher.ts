import { AppState, setLocale } from '@state'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

const useLocaleSwitcher = (): { handleLocaleChange: (locale: any) => void, current } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()

	const preferredLocaleValue = useSelector((state: AppState) => state.user?.preferredLocale?.value || 'en')
	const current = useSelector((state: AppState) => state.appLocale)

	const handleLocaleChange = useCallback(
		async (locale) => {
			if (locale && locale.value) {
				await dispatch<any>(setLocale(locale.value))
				i18n.changeLanguage(locale?.value)
			}
		},
		[dispatch, i18n],
	)

	useEffect(() => {
		if (!!preferredLocaleValue) {
			handleLocaleChange(preferredLocaleValue)
		}
	}, [preferredLocaleValue, handleLocaleChange])

	return { handleLocaleChange, current }
}

export default useLocaleSwitcher
