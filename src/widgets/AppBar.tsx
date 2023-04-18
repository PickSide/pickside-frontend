import { FC, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, FormGroup, Grid, IconButton } from '@mui/material'
import { Home, Login } from '@mui/icons-material'

import { Dialog } from 'components'
import { Authentication, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
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

			<Grid container alignItems="center">
				<Grid item>
					<IconButton onClick={() => navigate('/')}>
						<Home />
					</IconButton>
				</Grid>
				<Grid item container justifyContent="flex-end" alignItems="center" columnSpacing={3} xs>
					<Grid item>
						<FormGroup row>
							<FormControlLabel label={t(localeLabel)} labelPlacement="start" control={<LanguageSwitcher />} />
							<FormControlLabel label={t(themeLabel)} labelPlacement="start" control={<ThemeSwitcher />} />
						</FormGroup>
					</Grid>

					{connectedUser ? (
						[
							<Grid key="notification-menu-itm" item>
								<NotificationMenu />
							</Grid>,
							<Grid key="profile-menu-itm" item>
								<ProfileMenu />
							</Grid>,
						]
					) : (
						<Grid item>
							<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
								<Login />
							</IconButton>
						</Grid>
					)}
				</Grid>
			</Grid>
		</>
	)
}

export default AppBar
