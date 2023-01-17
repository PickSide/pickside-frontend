import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Brightness2 } from '@mui/icons-material'

import { Switch } from 'components'
import { ColorModeContext } from 'hooks/useMode'
import { AppState } from 'state'
import { updateAppConfiguration } from 'state/config'
import { useTranslation } from 'react-i18next'

const ThemeToggler = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const appConfig = useSelector((state: AppState) => state.appConfig)

	useEffect(() => {
		console.log(appConfig)
	}, [appConfig])

	return (
		<ColorModeContext.Consumer>
			{({ mode, toggleColorMode }) => (
				<Switch
					freeSolo
					checked={mode === 'dark' || false}
					checkedIcon={<Brightness2 />}
					tooltip
					tooltipHelperText={mode === 'light' ? t('Toggle dark mode') : t('Toggle light mode')}
					sx={{
						'& .MuiSwitch-thumb': {
							backgroundColor: (theme) => theme.palette.primary.main,
						},
					}}
					onChange={(e) => {
						e.preventDefault()
						toggleColorMode()
						dispatch<any>(updateAppConfiguration({ darkModeEnabled: mode === 'dark' }))
					}}
				/>
			)}
		</ColorModeContext.Consumer>
	)
}

export default ThemeToggler
