import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { setLocal } from 'state/appLocale'

const useLocaleSwitcher = (): { appLocale: any, changeLocale: Function, locales: any } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()

	const appLocale = useSelector((state: AppState) => state.appLocale)
	const locales = useSelector((state: AppState) => state.locales)

	const changeLocale = useCallback(
		async (value) => {
			await dispatch<any>(setLocal(value))
			i18n.changeLanguage(value)
		},
		[dispatch, i18n],
	)

	return { appLocale, changeLocale, locales }
}

export default useLocaleSwitcher
