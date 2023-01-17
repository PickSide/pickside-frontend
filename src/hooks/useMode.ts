import { createContext, useMemo, useState } from 'react'
import { deepmerge } from '@mui/utils'
import { PaletteMode, createTheme, Theme } from '@mui/material'
import { getDesignTokens, getThemedComponents } from '../theme'
import { useGlobalConfig } from 'hooks'

export const ColorModeContext = createContext({
	mode: 'light',
	toggleColorMode: () => {},
})

export const useMode = (): [theme: Theme, colorMode: { mode: PaletteMode; toggleColorMode: () => {} | void }] => {
	const globalConfig = useGlobalConfig()
	const [mode, setMode] = useState<PaletteMode>(globalConfig.theme || 'light')

	const colorMode = useMemo(
		() => ({
			mode,
			toggleColorMode: () => {
				console.log(mode)
				setMode(mode === 'dark' ? 'light' : 'dark')
			},
		}),
		[globalConfig],
	)

	const theme = useMemo(() => createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))), [mode])

	return [theme, colorMode]
}

export default {
	ColorModeContext,
	useMode,
}
