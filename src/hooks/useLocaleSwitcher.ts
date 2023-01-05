import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { updateAppConfiguration } from 'state/config'

const useLocaleSwitcher = (): { changeLocale: Function } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()

	const changeLocale = useCallback(async (value) => {
		await dispatch<any>(updateAppConfiguration({ locale: value }))
		i18n.changeLanguage(value)
	}, [])

	return { changeLocale }
}

export default useLocaleSwitcher
