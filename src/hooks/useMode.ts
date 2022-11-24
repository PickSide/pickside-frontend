import { createContext, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deepmerge } from '@mui/utils'
import { PaletteMode, createTheme, Theme } from '@mui/material'
import { updateAppConfiguration } from 'state/config'
import { getDesignTokens, getThemedComponents } from '../theme'
import { AppState } from 'state'

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
})

export const useMode = (): [theme: Theme, colorMode: { toggleColorMode: () => {} | void }] => {
	const dispatch = useDispatch()
	const isDarkModeOn = useSelector((state: AppState) => state.appConfig?.darkModeOn)
	const [mode, setMode] = useState<PaletteMode>(isDarkModeOn ? 'dark' : 'light')

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				dispatch<any>(updateAppConfiguration({ darkModeOn: !isDarkModeOn || false }))
				setMode(isDarkModeOn ? 'light' : 'dark')
			},
		}),
		[isDarkModeOn],
	)

	const theme = useMemo(() => createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))), [mode])

	return [theme, colorMode]
}

export default {
	ColorModeContext,
	useMode,
}
