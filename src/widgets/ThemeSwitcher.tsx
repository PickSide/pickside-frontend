import { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Brightness4, DarkMode, LightMode } from '@mui/icons-material'
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { Switch } from 'components'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import AppThemeContext from 'context/AppThemeContext'

const ThemeSwitcher: FC<any> = () => {
	const { toggleTheme } = useContext(AppThemeContext)
	const { t } = useTranslation()
	const current = useSelector((state: AppState) => state.appTheme)

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const ThemeIconMap = {
		dark: { icon: <DarkMode />, label: t('Dark') },
		light: { icon: <LightMode />, label: t('Light') },
	}

	const ThemesEl = (): JSX.Element => (
		<>
			{['dark', 'light'].map((theme, idx) => (
				<MenuItem
					key={idx}
					disabled={current === theme}
					onClick={() => {
						toggleTheme(theme)
						handleClose()
					}}
					value={theme}
				>
					<ListItemIcon>{ThemeIconMap[theme].icon}</ListItemIcon>
					<ListItemText>
						<Typography>{ThemeIconMap[theme].label}</Typography>
					</ListItemText>
				</MenuItem>
			))}
		</>
	)
	return (
		<div>
			<IconButton id="locale-open-btn" onClick={handleOpen}>
				<Brightness4 />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<ThemesEl />
			</Menu>
		</div>
	)
}

export default ThemeSwitcher
