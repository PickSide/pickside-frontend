import { FC, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'
import { Home, Login } from '@mui/icons-material'
import { BiMenu } from 'react-icons/bi'

import { Dialog, Sidenav } from 'components'
import { useIsMobile, useOnScreen } from 'hooks'
import { Authentication, BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'
import { startCase, upperCase } from 'lodash'

const AppBar: FC<any> = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref = useRef() as React.MutableRefObject<HTMLInputElement>
	const isMobile = useIsMobile()
	const onScreen = useOnScreen(ref)

	const connectedUser = useSelector((state: AppState) => state.account)
	const appTheme = useSelector((state: AppState) => state.appTheme)
	const appLocale = useSelector((state: AppState) => state.appLocale)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

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
			<div className="bg-primary flex overflow-hidden h-16 items-center px-5" ref={ref}>
				{!isMobile ? (
					<>
						<div className="flex-1 ">
							<IconButton onClick={() => navigate('/')}>
								<Home />
							</IconButton>
						</div>
						<div className="flex">
							<LanguageSwitcher />
							<ThemeSwitcher />

							{connectedUser ? (
								[<NotificationMenu />, <ProfileMenu />]
							) : (
								<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
									<Login />
								</IconButton>
							)}
						</div>
					</>
				) : (
					<>
						<div className="flex-1 ">
							<IconButton onClick={() => setOpenDrawer(true)}>
								<BiMenu />
							</IconButton>
						</div>
						<div className="flex">
							<LanguageSwitcher />
							<ThemeSwitcher />

							{connectedUser ? (
								[<NotificationMenu />, <ProfileMenu />]
							) : (
								<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
									<Login />
								</IconButton>
							)}
						</div>
						{openDrawer && <Sidenav className="bg-primary" open={openDrawer} onClose={() => setOpenDrawer(false)} />}
					</>
				)}
			</div>

			{!onScreen && <BackButton />}
		</>
	)
}

export default AppBar
