import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { BiMenu } from 'react-icons/bi'
import { FaGlobe } from 'react-icons/fa'

import { Button, DialogV2, IconDropdown, MenuItem, Sidenav } from 'components'
import { useIsMobile, useLocaleSwitcher, useOnScreen } from 'hooks'
import { Authentication, BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'
import { startCase, upperCase } from 'lodash'

const ROUTES_TO_EXCLUDE_BAR = ['/login', '/signup']

const AppBar = (props) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref = useRef<any>()
	const ref2 = useRef<any>()
	const isMobile = useIsMobile()
	const onScreen = useOnScreen(ref)
	const { current, handleLocaleChange } = useLocaleSwitcher()

	const connectedUser = useSelector((state: AppState) => state.account)
	const locales = useSelector((state: AppState) => state.locales)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)
	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])

	return showAppBar ? (
		<>
			{/* <DialogV2
				open={openAuthenticationDialog}
				title={t('Authentication')}
				onClose={() => setOpenAuthenticationDialog(false)}
			>
				<Authentication onClose={() => setOpenAuthenticationDialog(false)} />
			</DialogV2>
			<div className="relative bg-primary flex overflow-hidden h-16 items-center px-5" ref={ref}>
				{!isMobile ? (
					<>
						<div className="flex-1">
							<Button isIcon onClick={() => navigate('/')}>
								<AiFillHome size={25} />
							</Button>
						</div>
						<div className="flex">
							<IconDropdown icon={<FaGlobe size={25} />} ref={ref2}>
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
							</IconDropdown>

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
								<Button isIcon onClick={() => navigate('/login')}>
									<AiOutlineLogin />
								</Button>
							)}
						</div>
						{openDrawer && <Sidenav className="bg-primary" open={openDrawer} onClose={() => setOpenDrawer(false)} />}
					</>
				)}
			</div>

			{!onScreen && <BackButton />} */}
			<div className="relative bg-primary h-16 px-5" ref={ref}>
				<div className="flex items-center justify-between h-full">
					<div className="flex">
						<Button isIcon onClick={() => navigate('/')}>
							<AiFillHome size={25} />
						</Button>
					</div>
					<div className="flex">
						<LanguageSwitcher />
						<ThemeSwitcher />
						{connectedUser ? (
							<>
								<NotificationMenu />
								<ProfileMenu />
							</>
						) : (
							<Button isIcon onClick={() => navigate('/login')}>
								<AiOutlineLogin size={25} />
							</Button>
						)}
					</div>
				</div>
			</div>
			{!onScreen && <BackButton />}
		</>
	) : null
}

export default AppBar
