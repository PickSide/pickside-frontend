import { createContext, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deepmerge } from '@mui/utils'
import { PaletteMode, createTheme, useMediaQuery, Theme } from '@mui/material'
import { AppConfig, updateAppConfiguration, setAppConfig } from 'state/config'
import { getDesignTokens, getThemedComponents } from '../theme'
import { AppState } from 'state'

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
})

export const useMode = (): [theme: Theme, colorMode: { toggleColorMode: () => {} | void }] => {
	const dispatch = useDispatch()
	const appConfig = useSelector((state: AppState) => state.appConfig)
	const [mode, setMode] = useState<PaletteMode>(appConfig?.darkModeOn ? 'dark' : 'light')

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				if (appConfig?.darkModeOn) {
					dispatch<any>(updateAppConfiguration({ darkModeOn: false }))
					setMode('light')
				} else {
					dispatch<any>(updateAppConfiguration({ darkModeOn: true }))
					setMode('dark')
				}
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
