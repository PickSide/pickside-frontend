// https://www.iso.org/obp/ui/#search
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '@mui/icons-material'
import { Grid, IconButton, MenuItem } from '@mui/material'
import { Popover } from 'components'
import { AppState } from 'state'
import { fetchLocales } from 'state/locales'
import { useLocaleSwitcher } from 'hooks'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSwitcher: FC<any> = ({ ...props }) => {
	const dispatch = useDispatch()
	const { changeLocale } = useLocaleSwitcher()
	const locales = useSelector((state: AppState) => state.locales)
	const config = useSelector((state: AppState) => state.appConfig)

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
					value={locale.id}
					disabled={config?.locale === locale.value}
					onClick={() => changeLocale(locale.value)}
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
