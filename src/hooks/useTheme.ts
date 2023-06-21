import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, setAppTheme } from 'state'

export const useTheme = (): [toggleTheme: Function] => {
	const theme = useSelector((state: AppState) => state.appTheme) || 'light'
	const dispatch = useDispatch()

	const toggleTheme = useCallback(async () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		const root = window.document.documentElement
		root.classList.remove(theme)
		await dispatch<any>(setAppTheme(newTheme))
		root.classList.add(newTheme)
	}, [dispatch, theme])

	return [toggleTheme]
}

export default useTheme
