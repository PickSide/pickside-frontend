// https://www.iso.org/obp/ui/#search
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '@mui/icons-material'
import { Grid, IconButton, MenuItem } from '@mui/material'
import { Popover } from 'components'
import { AppState } from 'state'
import { fetchSupportedLanguages } from 'state/locales'
import '/node_modules/flag-icons/css/flag-icons.min.css'

const LanguageSwitcher: FC<any> = ({ ...props }) => {
	const locales = useSelector((state: AppState) => state.locales)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!locales) {
			dispatch<any>(fetchSupportedLanguages())
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
				<MenuItem key={idx} value={locale.id}>
					<Grid container wrap="nowrap" columnSpacing={2}>
						<Grid item>
							<span className={`fi fi-${locale}`}></span>
						</Grid>
						<Grid item>{locale.description}</Grid>
					</Grid>
				</MenuItem>
			))}
		</Popover>
	)
}

export default LanguageSwitcher
