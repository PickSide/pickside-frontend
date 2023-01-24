import { useCallback, useContext, useMemo } from 'react'
import { deepmerge } from '@mui/utils'
import { createTheme, Theme } from '@mui/material'
import { getDesignTokens, getThemedComponents } from '../theme'
import { changeTheme } from 'state/appTheme'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'

interface UseThemeOutput {
	theme: string
	palette: Theme
	toggleTheme?: Function
}

export const useTheme = (): UseThemeOutput => {
	const theme = useSelector((state: AppState) => state.appTheme)
	const dispatch = useDispatch()

	const palette = useMemo(() => {
		return createTheme(deepmerge(getDesignTokens(theme), getThemedComponents(theme)))
	}, [theme])

	const toggleTheme = useCallback(async () => {
		await dispatch<any>(changeTheme())
	}, [theme])

	return { theme, palette, toggleTheme }
}

export default useTheme
