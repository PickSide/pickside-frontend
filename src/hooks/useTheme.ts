import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deepmerge } from '@mui/utils'
import { createTheme, Theme } from '@mui/material'
import { getDesignTokens, getThemedComponents } from '../theme'
import { AppState, setAppTheme } from 'state'

export const useTheme = (): [palette: Theme, toggleTheme: Function] => {
	const theme = useSelector((state: AppState) => state.appTheme) || 'light'
	const defaultDarkModeIsON = useSelector((state: AppState) => state.account?.configs?.darkModeDefault)
	const dispatch = useDispatch()

	useEffect(() => {
		if (defaultDarkModeIsON) {
			dispatch<any>(setAppTheme('dark'))
		}
	}, [defaultDarkModeIsON, dispatch])

	const palette = useMemo(() => {
		return createTheme(deepmerge(getDesignTokens(theme), getThemedComponents(theme)))
	}, [theme])

	const toggleTheme = useCallback(async () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		await dispatch<any>(setAppTheme(newTheme))
	}, [dispatch, theme])

	return [palette, toggleTheme]
}



export default useTheme
