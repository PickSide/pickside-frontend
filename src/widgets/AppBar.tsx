import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

import { Button, IconButton } from 'components'
import { useIsMobile, useLocaleSwitcher, useOnScreen } from 'hooks'
import { BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'

const ROUTES_TO_EXCLUDE_BAR = ['/login', '/signup']

const AppBar = (props) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref = useRef<any>()
	const isMobile = useIsMobile()
	const onScreen = useOnScreen(ref)
	const { current, handleLocaleChange } = useLocaleSwitcher()

	const connectedUser = useSelector((state: AppState) => state.account)
	const locales = useSelector((state: AppState) => state.locales)

	const [openDrawer, setOpenDrawer] = useState<boolean>(false)

	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])

	return showAppBar ? (
		<>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={pageTransition}
				className="relative h-16 px-5 shadow-md"
				ref={ref}
			>
				<div className="flex items-center justify-between h-full">
					<div className="flex">
						<IconButton onClick={() => navigate('/')} icon={<AiFillHome size={20} />} />
					</div>
					<div className="flex items-center gap-x-3">
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
			</motion.div>
			{!onScreen && <BackButton />}
		</>
	) : null
}

export default AppBar
