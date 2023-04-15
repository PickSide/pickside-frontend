import { FC, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, FormGroup, Grid, IconButton } from '@mui/material'
import { Home, Login } from '@mui/icons-material'

import { Dialog } from 'components'
import { Authentication, LanguageSwitcher, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'
import { startCase, upperCase } from 'lodash'

const AppBar: FC<any> = ({ ...props }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.account)
	const appTheme = useSelector((state: AppState) => state.appTheme)
	const appLocale = useSelector((state: AppState) => state.appLocale)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

	const themeLabel = useMemo(() => startCase(appTheme), [appTheme])
	const localeLabel = useMemo(() => upperCase(appLocale), [appLocale])

	return (
		<>
			<Dialog
				open={openAuthenticationDialog}
				onClose={() => setOpenAuthenticationDialog(false)}
				title={t('Authentication')}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				size="sm"
			>
				<Authentication />
			</Dialog>

			<Grid container justifyContent="space-around" alignItems="center" wrap="nowrap">
				<Grid item xs>
					<IconButton onClick={() => navigate('/')}>
						<Home />
					</IconButton>
				</Grid>
				<Grid item container justifyContent="flex-end" alignItems="center" columnSpacing={4} xs>
					<FormGroup row>
						<Grid item>
							<FormControlLabel label={t(localeLabel)} labelPlacement="start" control={<LanguageSwitcher />} />
						</Grid>
						<Grid item>
							<FormControlLabel label={t(themeLabel)} labelPlacement="start" control={<ThemeSwitcher />} />
						</Grid>
					</FormGroup>
					<Grid item>
						{connectedUser ? (
							<ProfileMenu />
						) : (
							<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
								<Login />
							</IconButton>
						)}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default AppBar
