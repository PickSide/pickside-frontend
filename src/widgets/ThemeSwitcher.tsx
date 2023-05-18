import { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CgDarkMode } from 'react-icons/cg'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { MenuItem, IconDropdown } from 'components'
import { AppState } from 'state'
import AppThemeContext from 'context/AppThemeContext'

const ThemeSwitcher: FC<any> = () => {
	const { toggleTheme } = useContext(AppThemeContext)
	const { t } = useTranslation()
	const current = useSelector((state: AppState) => state.appTheme)

	const ThemeIconMap = {
		dark: { icon: <MdDarkMode size={25} />, label: t('Dark') },
		light: { icon: <MdLightMode size={25} />, label: t('Light') },
	}

	const ThemesEl = (): JSX.Element => (
		<>
			{['dark', 'light'].map((theme, idx) => (
				<MenuItem
					key={idx}
					disabled={current === theme}
					onClick={() => toggleTheme(theme)}
					icon={ThemeIconMap[theme].icon}
				>
					{ThemeIconMap[theme].label}
				</MenuItem>
			))}
		</>
	)
	return (
		<IconDropdown icon={<CgDarkMode size={25} />}>
			<ThemesEl />
		</IconDropdown>
	)
}

export default ThemeSwitcher
