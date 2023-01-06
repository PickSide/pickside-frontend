import { createContext, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deepmerge } from '@mui/utils'
import { PaletteMode, createTheme, Theme } from '@mui/material'
import { updateAppConfiguration } from 'state/config'
import { getDesignTokens, getThemedComponents } from '../theme'
import { AppState } from 'state'

export const ColorModeContext = createContext({
	mode: 'light',
	toggleColorMode: () => {},
})

export const useMode = (): [theme: Theme, colorMode: { mode: PaletteMode; toggleColorMode: () => {} | void }] => {
	const dispatch = useDispatch()
	const appConfig = useSelector((state: AppState) => state.appConfig)
	const [mode, setMode] = useState<PaletteMode>(appConfig?.darkModeEnabled ? 'dark' : 'light')

	const colorMode = useMemo(
		() => ({
			mode,
			toggleColorMode: () => {
				dispatch<any>(updateAppConfiguration({ darkModeEnabled: !appConfig?.darkModeEnabled || false }))
				setMode(appConfig?.darkModeEnabled ? 'light' : 'dark')
			},
		}),
		[appConfig],
	)

	const theme = useMemo(() => createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))), [mode])

	return [theme, colorMode]
}

export default {
	ColorModeContext,
	useMode,
}
