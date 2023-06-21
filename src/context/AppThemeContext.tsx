import { createContext, useContext, FC, ReactNode, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'hooks'
import { AppState } from 'state'

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
	const dispatch = useDispatch()
	const [currentTheme, setCurrentTheme, removeCurrentTheme] = useLocalStorage('currentTheme', 'light')
	const [preferredTheme, setPreferredTheme, removePreferredTheme] = useLocalStorage('preferredTheme', 'light')

	const appTheme = useSelector((state: AppState) => state.appTheme)
	const account = useSelector((state: AppState) => state.account)

	useEffect(() => {
		if (account) {
			setPreferredTheme(account.defaultTheme)
		}
	}, [account, setPreferredTheme])

	useEffect(() => {
		if (appTheme) {
			setCurrentTheme(appTheme)
		}
	}, [appTheme, dispatch, setCurrentTheme])

	return <AppThemeContext.Provider value={{ toggleTheme }}>{children}</AppThemeContext.Provider>
}

export default AppThemeContext
