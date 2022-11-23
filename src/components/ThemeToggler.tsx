import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { Brightness2, Brightness5 } from '@mui/icons-material'

import { ColorModeContext } from 'hooks/useMode'
import { AppState } from 'state'

const ThemeToggler = () => {
	const appConfig = useSelector((state: AppState) => state.appConfig)

	return (
		<ColorModeContext.Consumer>
			{({ toggleColorMode }) => (
				<IconButton onClick={() => toggleColorMode()}>
					{appConfig?.darkModeOn ? <Brightness2 /> : <Brightness5 />}
				</IconButton>
			)}
		</ColorModeContext.Consumer>
	)
}

export default ThemeToggler
