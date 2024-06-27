import { Icon, IconButton, PrivilegedContent, Switch } from '@components'
import { NavLink, useLocation } from 'react-router-dom'
import { cn, pageTransition } from '@utils'
import { useContext, useRef, useState } from 'react'
import { useLocaleSwitcher, useLogout } from '@hooks'

import { AppState } from '@state'
import Avatar from '@components/Avatar'
import Chatrooms from './components/chatroom/ChatroomList'
import NotificationMenu from './components/NotificationMenu'
import PopupMenu from './components/PopupMenu'
import { SidenavDispatchContext } from '@context'
import { USER_PERMISSIONS } from '@state/me/constants'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import useThemeSwitcher from './hooks/useThemeSwitcher'
import { useTranslation } from 'react-i18next'
import { version } from 'package.json'

const AppBarV2 = () => {
	const ref = useRef<HTMLDivElement | null>(null)
	const profileRef = useRef<any>(null)
	const { handleLocaleChange, locales } = useLocaleSwitcher()
	const sidenavDispatch = useContext(SidenavDispatchContext)
	const { handleThemeSwitch } = useThemeSwitcher()
	const { logout } = useLogout()
	const { pathname } = useLocation()
	const { t } = useTranslation()

	const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false)
	const me = useSelector((state: AppState) => state.user)
	const appLocale = useSelector((state: AppState) => state.appLocale)
	const appTheme = useSelector((state: AppState) => state.appTheme)

	const handleClickMessage = () => {
		sidenavDispatch({
			type: 'open',
			title: t('Messages'),
			content: (
				<Chatrooms
					callbackOnClick={() =>
						sidenavDispatch({
							type: 'close',
						})
					}
				/>
			),
		})
	}

	const NavLinkMenuItem = ({ name, to }) => (
		<NavLink to={to} className="seemless-link" onClick={() => setOpenProfileMenu(false)}>
			{name}
		</NavLink>
	)
	const LinkMenuItem = ({ name, onClick }) => (
		<a
			className="seemless-link"
			onClick={() => {
				onClick && onClick()
				setOpenProfileMenu(false)
			}}
		>
			{name}
		</a>
	)
	const PrivilegedNavLinkMenuItem = ({
		name,
		to,
		onClick,
		permissions = [],
	}: {
		name: string
		to: string
		onClick?: () => void
		permissions: USER_PERMISSIONS[]
	}) => (
		<PrivilegedContent permissions={permissions}>
			<NavLink
				to={to}
				className="seemless-link"
				onClick={() => {
					onClick && onClick()
					setOpenProfileMenu(false)
				}}
			>
				{name}
			</NavLink>
		</PrivilegedContent>
	)

	return (
		<motion.div
			id="navbar"
			ref={ref}
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="flex h-16 pl-5 pr-5 lg:px-10 w-full dark:bg-charcoal-black "
		>
			<div className="w-full h-10 my-auto">
				<NavLink to="/" className="float-left w-24 h-full bg-logo bg-contain bg-no-repeat" />
				<div className="float-right flex items-center gap-x-6">
					<div className="hidden md:flex items-center gap-x-6">
						{me && pathname !== '/new-event' && (
							<PrivilegedNavLinkMenuItem
								key="new-event"
								to="/new-event"
								name={t('Post an event')}
								permissions={[USER_PERMISSIONS.MANAGE_ACTIVITIES]}
							/>
						)}
						{me && (
							<IconButton onClick={handleClickMessage}>
								<Icon icon="chat_bubble_outline" />
							</IconButton>
						)}
						{me && <NotificationMenu />}
					</div>
					<PopupMenu
						ref={profileRef}
						open={openProfileMenu}
						onClose={() => setOpenProfileMenu(false)}
						trigger={
							<span className="border-ocean btn-base" onClick={() => setOpenProfileMenu(true)}>
								<Avatar size="lg" variant="secondary" src={me?.avatar} />
							</span>
						}
					>
						<ul className="space-y-4 px-4">
							{me ? (
								<li key="display-name" className="">
									<div className="flex flex-col items-start gap-x-2">
										<span className="font-semibold">{me.displayName}</span>
										<span className="opacity-40">{me.email}</span>
									</div>
								</li>
							) : (
								<li key="display-name" className="">
									<span className="opacity-40">{t('Not connected')}</span>
								</li>
							)}
							<li className="flex items-center gap-x-2 gap-y-2">
								<Icon icon="calendar_today" size="sm" />
								<NavLinkMenuItem to="/new-event" name={t('Post Event')} />
							</li>
							<li className="flex items-center gap-x-2 gap-y-2">
								<Icon icon="chat_bubble_outline" size="sm" />
								<LinkMenuItem name={t('Messages')} onClick={handleClickMessage} />
							</li>
							<li className="flex flex-col gap-x-2 gap-y-2 border-y py-2">
								<p className="font-medium opacity-60">{t('Language')}</p>
								<div className="flex items-center gap-x-2">
									{locales.map((locale, idx) => (
										<IconButton
											className={cn(locale.value === appLocale && 'border-2')}
											onClick={() => {
												handleLocaleChange(locale.value)
												setOpenProfileMenu(false)
											}}
										>
											<span key={idx} className={`rounded-sm fi fi-${locale.flagCode}`} />
										</IconButton>
									))}
								</div>
							</li>
							<li className="flex flex-col gap-x-2 gap-y-2">
								<div className="flex items-center gap-x-2 justify-between">
									<span>{t('Dark mode')}</span>
									<Switch
										defaultChecked={appTheme === 'dark'}
										size="md"
										onChange={(e) => handleThemeSwitch(e.target.checked ? 'dark' : 'light')}
									/>
								</div>
							</li>
							{me && (
								<li key="profile" className="text-base">
									<NavLinkMenuItem to="/user/settings" name={t('Profile')} />
								</li>
							)}
							{me && (
								<li key="groups" className="text-base">
									<PrivilegedNavLinkMenuItem
										to="/user/settings/groups"
										name={t('Groups')}
										permissions={[USER_PERMISSIONS.MANAGE_GROUPS]}
									/>
								</li>
							)}
							{!me && (
								<li key="login" className="text-base">
									<NavLinkMenuItem to="/login" name={t('Login')} />
								</li>
							)}
							{!me && (
								<li key="signup" className="text-base">
									<NavLinkMenuItem to="/signup" name={t('Signup')} />
								</li>
							)}

							{me && (
								<li key="logout" className="text-base">
									<LinkMenuItem name={t('Logout')} onClick={logout} />
								</li>
							)}
							<li className="text-base">
								<span className="disabled-el">{t('Version', { version })}</span>
							</li>
						</ul>
					</PopupMenu>
				</div>
			</div>
		</motion.div>
	)
}

export default AppBarV2
