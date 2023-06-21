import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CgDarkMode } from 'react-icons/cg'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem, Dropdown } from 'components'
import { AppState, setAppTheme } from 'state'

const ThemeSwitcher: FC<any> = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const current = useSelector((state: AppState) => state.appTheme)

	const ThemeIconMap = {
		dark: { icon: <MdDarkMode size={20} />, label: t('Dark') },
		light: { icon: <MdLightMode size={20} />, label: t('Light') },
	}

	const ThemesEl = (): JSX.Element => (
		<>
			{['dark', 'light'].map((theme, idx) => (
				<MenuItem
					key={idx}
					disabled={current === theme}
					onClick={() => dispatch<any>(setAppTheme(theme))}
					icon={ThemeIconMap[theme].icon}
				>
					{ThemeIconMap[theme].label}
				</MenuItem>
			))}
		</>
	)
	return (
		<Dropdown variant="tertiary" text={t(`${current}`)} start={<CgDarkMode size={20} />}>
			<ThemesEl />
		</Dropdown>
	)
}

export default ThemeSwitcher
