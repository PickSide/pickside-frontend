import { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DarkMode, LightMode } from '@mui/icons-material'
import { CgDarkMode } from 'react-icons/cg'
import { ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Button } from 'components'
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
			<Button id="locale-open-btn" isIcon onClick={handleOpen}>
				<CgDarkMode size={25} />
			</Button>
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
