import { createContext, useContext, FC, ReactNode } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useTheme } from 'hooks'

export interface AppThemeContextProps {
	children?: ReactNode
	toggleTheme: Function
}

const AppThemeContext = createContext<AppThemeContextProps>({
	toggleTheme: () => {},
})

export const useThemeContext = () => useContext(AppThemeContext)

export const AppThemeProvider: FC<any> = ({ children }) => {
	const [palette, toggleTheme] = useTheme()

	return (
		<AppThemeContext.Provider value={{ toggleTheme }}>
			<CssBaseline />
			<ThemeProvider theme={palette}>{children}</ThemeProvider>
		</AppThemeContext.Provider>
	)
}

export default AppThemeContext
