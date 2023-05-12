import { FC, createRef, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Login } from '@mui/icons-material'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'

import { Button, Dialog, DialogV2, Sidenav } from 'components'
import { useIsMobile, useOnScreen } from 'hooks'
import { Authentication, BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'
import { startCase, upperCase } from 'lodash'

const ROUTES_TO_EXCLUDE_BAR = ['/login', '/signup']

const AppBar: FC<any> = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref = useRef() as React.MutableRefObject<HTMLInputElement>
	const loginRef = useRef<any>(null)
	const isMobile = useIsMobile()
	const onScreen = useOnScreen(ref)

	const connectedUser = useSelector((state: AppState) => state.account)
	const appTheme = useSelector((state: AppState) => state.appTheme)
	const appLocale = useSelector((state: AppState) => state.appLocale)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	const themeLabel = useMemo(() => startCase(appTheme), [appTheme])
	const localeLabel = useMemo(() => upperCase(appLocale), [appLocale])
	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])

	return showAppBar ? (
		<>
			<DialogV2
				open={openAuthenticationDialog}
				title={t('Authentication')}
				onClose={() => setOpenAuthenticationDialog(false)}
			>
				<Authentication onClose={() => setOpenAuthenticationDialog(false)} />
			</DialogV2>
			<div className="bg-primary flex overflow-hidden h-16 items-center px-5" ref={ref}>
				{!isMobile ? (
					<>
						<div className="flex-1 ">
							<Button isIcon onClick={() => navigate('/')}>
								<AiFillHome size={25} />
							</Button>
						</div>
						<div className="flex">
							<LanguageSwitcher />
							<ThemeSwitcher />

							{connectedUser ? (
								[<NotificationMenu />, <ProfileMenu />]
							) : (
								<Button isIcon onClick={() => navigate('/login')}>
									<AiOutlineLogin size={25} />
								</Button>
							)}
						</div>
					</>
				) : (
					<>
						<div className="flex-1 ">
							<Button isIcon onClick={() => setOpenDrawer(true)}>
								<BiMenu size={25} />
							</Button>
						</div>
						<div className="flex">
							<LanguageSwitcher />
							<ThemeSwitcher />

							{connectedUser ? (
								[<NotificationMenu />, <ProfileMenu />]
							) : (
								<Button isIcon ref={loginRef} onClick={() => navigate('/login')}>
									<Login />
								</Button>
							)}
						</div>
						{openDrawer && <Sidenav className="bg-primary" open={openDrawer} onClose={() => setOpenDrawer(false)} />}
					</>
				)}
			</div>

			{!onScreen && <BackButton />}
		</>
	) : null
}

export default AppBar
