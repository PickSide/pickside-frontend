import { Brightness2 } from '@mui/icons-material'

import { Switch } from 'components'
import { useTheme } from 'hooks'
import { useTranslation } from 'react-i18next'

const ThemeToggler = () => {
	const { t } = useTranslation()
	const { theme, toggleTheme } = useTheme()

	return (
		<Switch
			freeSolo
			checked={theme === 'dark'}
			checkedIcon={<Brightness2 />}
			tooltip
			tooltipHelperText={theme === 'light' ? t('Toggle dark mode') : t('Toggle light mode')}
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
