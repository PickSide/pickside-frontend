import { Dropdown, Icon, MenuItem } from '@components'

import { AppState } from '@state'
import { useLocaleSwitcher } from '@hooks'
import { useSelector } from 'react-redux'

const LanguageSwitcher = ({ ...rest }) => {
	const { current, handleLocaleChange } = useLocaleSwitcher()

	const locales = useSelector((state: AppState) => state.locales)

	const LocalesEl = (): JSX.Element => (
		<>
			{locales?.results?.map((locale, idx) => (
				<MenuItem
					key={idx}
					disabled={current === locale.value}
					onClick={() => handleLocaleChange(locale)}
					icon={<span className={`fi-gr fi-${locale.flagCode}`}></span>}
				>
					{locale.description}
				</MenuItem>
			))}
		</>
	)

	return (
		<Dropdown className="capitalize" text={current} icon={<Icon icon="language" />}>
			<LocalesEl />
		</Dropdown>
	)
}

export default LanguageSwitcher
