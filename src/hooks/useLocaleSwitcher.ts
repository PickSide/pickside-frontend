import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setLocale, AppState } from 'state'

const useLocaleSwitcher = (): { handleLocaleChange: (locale: any) => void, current } => {
	const dispatch = useDispatch()
	const { i18n } = useTranslation()

	const defaultLanguage = useSelector((state: AppState) => state.account?.defaultLanguage)
	const current = useSelector((state: AppState) => state.appLocale)

	const handleLocaleChange = useCallback(
		async (value) => {
			await dispatch<any>(setLocale(value))
			i18n.changeLanguage(value)
		},
		[dispatch, i18n],
	)

	useEffect(() => {
		if (!!defaultLanguage) {
			handleLocaleChange(defaultLanguage)
		}
	}, [defaultLanguage, handleLocaleChange])

	return { handleLocaleChange, current }
}

export default useLocaleSwitcher
