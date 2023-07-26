import { BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { Button, IconDropdown, MenuItem } from 'components'
import { MdLogout, MdOutlineHistory, MdOutlineSettings, MdPersonOutline } from 'react-icons/md'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApi, useDevice, useOnScreen } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useRef } from 'react'

import { AiOutlineLogin } from 'react-icons/ai'
import { AppState } from 'state'
import { BsCalendar2Event } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'
import { useTranslation } from 'react-i18next'

const ROUTES_TO_EXCLUDE_BAR = ['/login', '/signup']
const ROUTES_TO_INCLUDE_BACK_BUTTON = ['/home']

const AppBar = () => {
	const { isMobile } = useDevice()
	const { logout } = useApi()
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const ref = useRef<any>()
	const onScreen = useOnScreen(ref, '60px')

	const connectedUser = useSelector((state: AppState) => state.user)

	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])
	const showBackButton = useMemo(
		() => !onScreen && ROUTES_TO_INCLUDE_BACK_BUTTON.includes(pathname),
		[onScreen, pathname],
	)

	const MobileAppBar = () => (
		<div className="flex items-center justify-between h-full">
			<NavLink to="/home" className="w-12 outline-none border-none bg-templogo2 bg-contain bg-no-repeat h-10"></NavLink>
			<div className="inline-flex items-center">
				<IconDropdown icon={<GiHamburgerMenu size={20} />}>
					<MenuItem icon={<BsCalendar2Event size={20} />} onClick={() => navigate('/new-event')}>
						{t('Post event')}
					</MenuItem>
					{connectedUser ? (
						<>
							<MenuItem icon={<MdPersonOutline size={20} />} onClick={() => navigate('/user/profile')}>
								{t('Profile')}
							</MenuItem>
							<MenuItem icon={<MdOutlineSettings size={20} />} onClick={() => navigate('/user/settings/')}>
								{t('Settings')}
							</MenuItem>
							<MenuItem icon={<MdOutlineHistory size={20} />} onClick={() => navigate('/user/history')}>
								{t('History')}
							</MenuItem>
							<MenuItem
								icon={<MdLogout size={20} />}
								onClick={async () => {
									await dispatch<any>(logout())
									navigate('/login')
								}}
							>
								{t('Logout')}
							</MenuItem>
						</>
					) : (
						<MenuItem icon={<AiOutlineLogin size={20} />} onClick={() => navigate('/login')}>
							{t('Login')}
						</MenuItem>
					)}
				</IconDropdown>
			</div>
		</div>
	)

	return showAppBar ? (
		<>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={pageTransition}
				className={`relative h-16 px-5 ${
					pathname === '/' || pathname === '/home' ? 'bg-landing-texture' : 'bg-[#F1F4F3]'
				} dark:bg-black`}
				ref={ref}
			>
				{isMobile ? (
					<MobileAppBar />
				) : (
					<div className="flex items-center justify-between h-full">
						<div className="flex">
							<NavLink
								to="/home"
								className="w-12 outline-none border-none bg-templogo2 bg-contain bg-no-repeat h-10"
							></NavLink>
						</div>
						<div className="flex items-center gap-x-3">
							{connectedUser && (
								<Button
									disabled={pathname === '/new-event'}
									onClick={() => navigate('/new-event')}
									text={t('Post event')}
								/>
							)}
							<LanguageSwitcher />
							<ThemeSwitcher />
							{connectedUser ? (
								<>
									<NotificationMenu />
									<ProfileMenu />
								</>
							) : (
								<Button onClick={() => navigate('/login')} text={t('Login')} />
							)}
						</div>
					</div>
				)}
			</motion.div>
			{showBackButton && <BackButton />}
		</>
	) : null
}

export default AppBar
