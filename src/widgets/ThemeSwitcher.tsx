import { AppState, setAppTheme } from '@state'
import { Dropdown, IconDropdown, MenuItem } from '@components'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { CgDarkMode } from 'react-icons/cg'
import { FC } from 'react'
import { useDevice } from '@hooks'
import { useTranslation } from 'react-i18next'

const ThemeSwitcher: FC<any> = () => {
	const dispatch = useDispatch()
	const [device] = useDevice()
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
	return device === 'mobile' ? (
		<IconDropdown icon={<CgDarkMode size={20} />}>
			<ThemesEl />
		</IconDropdown>
	) : (
		<Dropdown variant="secondary" text={t('Theme')} start={<CgDarkMode size={20} />}>
			<ThemesEl />
		</Dropdown>
	)
}

export default ThemeSwitcher
