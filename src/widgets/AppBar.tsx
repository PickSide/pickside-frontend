import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

import { Button } from 'components'
import { useIsMobile, useLocaleSwitcher, useOnScreen } from 'hooks'
import { BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'

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
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={pageTransition}
				className="relative bg-primary h-16 px-5"
				ref={ref}
			>
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
			</motion.div>
			{!onScreen && <BackButton />}
		</>
	) : null
}

export default AppBar
