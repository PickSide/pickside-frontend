import { useCallback, useMemo } from 'react'
import { deepmerge } from '@mui/utils'
import { createTheme, Theme } from '@mui/material'
import { getDesignTokens, getThemedComponents } from '../theme'
import { setAppTheme } from 'state/appTheme'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'

interface UseThemeOutput {
	theme?: string
	palette: Theme
	toggleTheme?: Function
}

export const useTheme = (): UseThemeOutput => {
	const theme = useSelector((state: AppState) => state.appTheme)
	const dispatch = useDispatch()

	const palette = useMemo(() => {
		console.log(theme)
		return createTheme(deepmerge(getDesignTokens(theme), getThemedComponents(theme)))
	}, [theme])

	const toggleTheme = useCallback(async () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark'
		await dispatch<any>(setAppTheme(nextTheme))
	}, [dispatch, theme])

	return { theme, palette, toggleTheme }
}

export default useTheme
