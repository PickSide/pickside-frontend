// https://www.iso.org/obp/ui/#search
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Language } from '@mui/icons-material'
import { Grid, IconButton, MenuItem } from '@mui/material'
import { Popover } from 'components'
import { useApi, useLocaleSwitcher } from 'hooks'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSwitcher: FC<any> = ({ ...props }) => {
	const { getLocales } = useApi()
	const dispatch = useDispatch()
	const { appLocale, changeLocale, locales } = useLocaleSwitcher()

	const handleClick = (value) => {
		changeLocale(value)
	}

	useEffect(() => {
		if (!locales) {
			dispatch<any>(getLocales())
		}
	}, [dispatch, getLocales, locales])

	return (
		<Popover
			triggerElement={
				<IconButton>
					<Language />
				</IconButton>
			}
		>
			{locales?.results?.map((locale, idx) => (
				<MenuItem
					key={idx}
					id={`locale-${locale.id}`}
					value={locale.value}
					disabled={appLocale === locale.value}
					onClick={() => handleClick(locale.value)}
				>
					<Grid container wrap="nowrap" columnSpacing={2}>
						<Grid item>
							<span className={`fi fi-${locale.flagCode}`}></span>
						</Grid>
						<Grid item>{locale.description}</Grid>
					</Grid>
				</MenuItem>
			))}
		</Popover>
	)
}

export default LanguageSwitcher
