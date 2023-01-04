import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControlLabel, IconButton, Switch } from '@mui/material'
import { LightMode, Brightness2 } from '@mui/icons-material'

import { ColorModeContext } from 'hooks/useMode'
import { AppState } from 'state'

const ThemeToggler = () => {
	const appConfig = useSelector((state: AppState) => state.appConfig)

	return (
		<ColorModeContext.Consumer>
			{({ toggleColorMode }) => (
				<Switch
					checked={appConfig?.darkModeEnabled || false}
					onChange={(e) => {
						e.preventDefault()
						toggleColorMode()
					}}
				/>
			)}
		</ColorModeContext.Consumer>
	)
}

export default ThemeToggler
