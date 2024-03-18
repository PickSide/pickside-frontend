import { AppState, setAppTheme } from '@state'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Theme = 'light' | 'dark'

const useThemeSwitcher = (): { handleThemeSwitch: (theme: any) => void; themes: Theme[]; current } => {
	const dispatch = useDispatch()

	const preferredTheme = useSelector((state: AppState) => state.user?.preferredTheme || 'light')
	const current = useSelector((state: AppState) => state.appTheme)

	const handleThemeSwitch = useCallback(
		async (theme) => {
			if (theme) {
				dispatch(setAppTheme(theme))
			}
		},
		[dispatch],
	)

	useEffect(() => {
		if (!!preferredTheme) {
			handleThemeSwitch(preferredTheme)
		}
	}, [preferredTheme, handleThemeSwitch])

	return { handleThemeSwitch, themes: ['light', 'dark'], current }
}

export default useThemeSwitcher
