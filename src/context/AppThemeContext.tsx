import { createContext, useContext, FC, ReactNode } from 'react'
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
	const [toggleTheme] = useTheme()

	return <AppThemeContext.Provider value={{ toggleTheme }}>{children}</AppThemeContext.Provider>
}

export default AppThemeContext
