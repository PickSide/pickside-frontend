import { useContext } from 'react'
import { Brightness2 } from '@mui/icons-material'
import { Switch } from 'components'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import AppThemeContext from 'context/AppThemeContext'

const ThemeToggler = () => {
	const { t } = useTranslation()
	const { toggleTheme } = useContext(AppThemeContext)
	const theme = useSelector((state: AppState) => state.appTheme)

	return (
		<Switch
			freeSolo
			checked={theme === 'dark'}
			checkedIcon={<Brightness2 />}
			sx={{
				'& .MuiSwitch-thumb': {
					backgroundColor: (theme) => theme.palette.primary.main,
				},
			}}
			onChange={(e) => {
				e.preventDefault()
				toggleTheme && toggleTheme()
			}}
		/>
	)
}

export default ThemeToggler
