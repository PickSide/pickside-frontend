import { AppState, setAppTheme } from '@state'
import { Dropdown, Icon, MenuItem } from '@components'
import { useDispatch, useSelector } from 'react-redux'

import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const ThemeSwitcher: FC<any> = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const current = useSelector((state: AppState) => state.appTheme)

	const ThemeIconMap = {
		dark: { icon: <Icon icon="dark_mode" />, label: t('Dark') },
		light: { icon: <Icon icon="light_mode" />, label: t('Light') },
	}

	const ThemesEl = (): JSX.Element => (
		<>
			{['dark', 'light'].map((theme, idx) => (
				<MenuItem
					key={idx}
					disabled={current === theme}
					onClick={() => dispatch(setAppTheme(theme))}
					icon={ThemeIconMap[theme].icon}
				>
					{ThemeIconMap[theme].label}
				</MenuItem>
			))}
		</>
	)
	return (
		<Dropdown text={t('Theme')} icon={ThemeIconMap[current!].icon}>
			<ThemesEl />
		</Dropdown>
	)
}

export default ThemeSwitcher
