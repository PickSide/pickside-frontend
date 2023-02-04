// https://www.iso.org/obp/ui/#search
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '@mui/icons-material'
import { Grid, IconButton, MenuItem } from '@mui/material'
import { Popover } from 'components'
import { AppState } from 'state'
import { changeLanguage } from 'state/appConfig'
import { fetchLocales } from 'state/locales'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSwitcher: FC<any> = ({ ...props }) => {
	const dispatch = useDispatch()
	const locales = useSelector((state: AppState) => state.locales)
	const appConfig = useSelector((state: AppState) => state.appConfig)

	const handleClick = (value) => {
		dispatch<any>(changeLanguage(value))
	}

	useEffect(() => {
		if (!locales) {
			dispatch<any>(fetchLocales())
		}
	}, [])

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
					disabled={appConfig?.lang === locale.value}
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
