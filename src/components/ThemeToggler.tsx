import { useSelector } from 'react-redux'
import { Brightness2 } from '@mui/icons-material'

import { Switch } from 'components'
import { ColorModeContext } from 'hooks/useMode'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'

const ThemeToggler = () => {
	const appConfig = useSelector((state: AppState) => state.appConfig)
	const { t } = useTranslation()

	return (
		<ColorModeContext.Consumer>
			{({ mode, toggleColorMode }) => (
				<Switch
					checked={appConfig?.darkModeEnabled || false}
					checkedIcon={<Brightness2 />}
					sx={{
						'& .MuiSwitch-thumb': {
							backgroundColor: (theme) => theme.palette.primary.main,
						},
					}}
					onChange={(e) => {
						e.preventDefault()
						toggleColorMode()
					}}
					tooltip
					tooltipHelperText={mode === 'light' ? t('Toggle dark mode') : t('Toggle light mode')}
				/>
			)}
		</ColorModeContext.Consumer>
	)
}

export default ThemeToggler
