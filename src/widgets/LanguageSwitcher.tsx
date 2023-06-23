// https://www.iso.org/obp/ui/#search
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, IconDropdown, MenuItem } from 'components'

import { FaGlobe } from 'react-icons/fa'
import { useDevice, useLocaleSwitcher } from 'hooks'
import { AppState } from 'state'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSwitcher = ({ ...rest }) => {
	const { current, handleLocaleChange } = useLocaleSwitcher()
	const { isMobile } = useDevice()

	const locales = useSelector((state: AppState) => state.locales)

	const LocalesEl = (): JSX.Element => (
		<>
			{locales?.results?.map((locale, idx) => (
				<MenuItem
					key={idx}
					disabled={current === locale.value}
					onClick={() => handleLocaleChange(locale.value)}
					icon={<span className={`fi fi-${locale.flagCode}`}></span>}
				>
					{locale.description}
				</MenuItem>
			))}
		</>
	)

	return isMobile ? (
		<IconDropdown icon={<FaGlobe size={20} />}>
			<LocalesEl />
		</IconDropdown>
	) : (
		<Dropdown variant="tertiary" text={current} start={<FaGlobe size={20} />}>
			<LocalesEl />
		</Dropdown>
	)
}

export default LanguageSwitcher
