import { MdLogout, MdOutlineHistory, MdOutlineSettings, MdPersonOutline } from 'react-icons/md'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useApi, useDevice, useOnScreen } from '@hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo, useRef } from 'react'

import { AiOutlineLogin } from 'react-icons/ai'
import { AppState } from '@state'
import { BsCalendar2Event } from 'react-icons/bs'
import Button from './shared/Button'
import { FaArrowUp } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import IconDropdown from './shared/IconDropdown'
import LanguageSwitcher from './shared/LanguageSwitcher'
import { Link } from 'react-scroll'
import MenuItem from './shared/MenuItem'
import NotificationMenu from './shared/NotificationMenu'
import ProfileMenu from './shared/ProfileMenu'
import ThemeSwitcher from './shared/ThemeSwitcher'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils'
import { useTranslation } from 'react-i18next'

const ROUTES_TO_EXCLUDE_BAR: any = []
const ROUTES_TO_INCLUDE_BACK_BUTTON = ['/home']

const AppBar = () => {
	const ref = useRef<any>()

	const [device] = useDevice()
	const { logout } = useApi()
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onScreen = useOnScreen(ref, '80px')

	const connectedUser = useSelector((state: AppState) => state.user)

	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])
	const showBackButton = useMemo(() => {
		return !onScreen && ROUTES_TO_INCLUDE_BACK_BUTTON.includes(pathname)
	}, [onScreen, pathname])

	const MobileAppBar = () => (
		<div className="flex items-center justify-between h-full" ref={ref}>
			<NavLink to="/home" className="w-12 outline-none border-none bg-templogo2 bg-contain bg-no-repeat h-10"></NavLink>
			<div className="inline-flex items-center">
				<IconDropdown icon={<GiHamburgerMenu size={20} />}>
					{connectedUser ? (
						<>
							<MenuItem icon={<BsCalendar2Event size={20} />} onClick={() => navigate('/new-event')}>
								{t('Post event')}
							</MenuItem>
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
			>
				{device === 'mobile' ? (
					<MobileAppBar />
				) : (
					<div className="flex items-center justify-between h-full" ref={ref}>
						<div className="flex">
							<NavLink
								to="/home"
								className="w-12 outline-none border-none bg-templogo2 bg-contain bg-no-repeat h-10"
							></NavLink>
						</div>
						<div className="flex items-center gap-x-3">
							{connectedUser && (
								<Button type="button" disabled={pathname === '/new-event'} onClick={() => navigate('/new-event')}>
									{t('Post event')}
								</Button>
							)}
							<LanguageSwitcher />
							<ThemeSwitcher />
							{connectedUser ? (
								<>
									<NotificationMenu />
									<ProfileMenu />
								</>
							) : (
								<Button type="button" onClick={() => navigate('/login')}>
									{t('Login')}
								</Button>
							)}
						</div>
					</div>
				)}
			</motion.div>
			{showBackButton && (
				<Link
					to="home"
					offset={-96}
					smooth={true}
					spy={true}
					className="fixed z-[999] m-auto right-5 bottom-5 rounded-full bg-primary text-white w-[40px] h-[40px] drop-shadow-lg cursor-pointer ease-in-out duration-75 hover:scale-110"
				>
					<div className="absolute top-[50%] left-[25%] -translate-y-[50%] w-full text-center">
						<FaArrowUp size={20} />
					</div>
				</Link>
			)}
		</>
	) : null
}

export default AppBar
