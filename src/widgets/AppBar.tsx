import { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

import { Button, IconButton } from 'components'
import { useLocalStorage, useOnScreen } from 'hooks'
import { BackButton, LanguageSwitcher, NotificationMenu, ProfileMenu, ThemeSwitcher } from 'widgets'
import { AppState } from 'state'

const ROUTES_TO_EXCLUDE_BAR = ['/login', '/signup']

const AppBar = (props) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const ref = useRef<any>()
	const onScreen = useOnScreen(ref)
	const { get, set } = useLocalStorage()
	const connectedUser = useSelector((state: AppState) => state.account)

	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])

	return showAppBar ? (
		<>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={pageTransition}
				className="relative h-16 px-5 shadow-md dark:bg-black"
				ref={ref}
			>
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
								disabled={!get('sportPreference')}
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
			</motion.div>
			{!onScreen && <BackButton />}
		</>
	) : null
}

export default AppBar
