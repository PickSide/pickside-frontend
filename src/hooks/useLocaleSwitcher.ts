import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { changeLanguage } from 'state/appConfig'

const useLocaleSwitcher = (): { changeLocale: Function } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()
	const appConfig = useSelector((state: AppState) => state.appConfig)

	const changeLocale = useCallback(
		async (value) => {
			await dispatch<any>(changeLanguage(value))
			i18n.changeLanguage(value)
		},
		[appConfig],
	)

	return { changeLocale }
}

export default useLocaleSwitcher
