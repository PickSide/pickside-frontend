import { ACCOUNT_TYPE, USER_PERMISSIONS } from '@state/user/constants'
import { Button, Icon, IconButton, PrivilegedContent, Radio, RadioGroup } from '@components'
import { NavLink, useLocation } from 'react-router-dom'
import { cn, pageTransition } from '@utils'
import { useContext, useRef, useState } from 'react'
import { useGuestLogout, useLocaleSwitcher, useLogout } from '@hooks'

import { AppState } from '@state'
import Avatar from '@components/Avatar'
import ChatroomsListing from './components/ChatroomsListing'
import { HashLink } from 'react-router-hash-link'
import NotificationMenu from './components/NotificationMenu'
import PopupMenu from './components/PopupMenu'
import PopupMenuItem from './components/shared/PopupMenuItem'
import PopupSubmenuItem from './components/shared/PopupSubmenuItem'
import { SidenavDispatchContext } from '@context'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import useThemeSwitcher from './hooks/useThemeSwitcher'
import { useTranslation } from 'react-i18next'

const AppBar = () => {
	const ref = useRef<HTMLDivElement | null>(null)
	const popMenuRef = useRef<any>(null)
	const { handleLocaleChange, locales, current: currentLocale } = useLocaleSwitcher()
	const sidenavDispatch = useContext(SidenavDispatchContext)
	const { handleThemeSwitch, themes, current: currentTheme } = useThemeSwitcher()
	const { logout } = useLogout()
	const { guestLogout } = useGuestLogout()
	const { pathname } = useLocation()
	const { t } = useTranslation()

	const [open, setOpen] = useState<boolean>(false)
	const connectedUser = useSelector((state: AppState) => state.user)

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className={cn(
				'flex h-16 pl-5 pr-5 lg:pr-16 w-full dark:bg-charcoal-black ',
				pathname === '/' ? 'bg-landing-texture' : 'bg-[#F1F4F3]',
			)}
		>
			<div className="w-full h-10 my-auto">
				<NavLink to="/" className="float-left w-12 h-full bg-templogo2 bg-contain bg-no-repeat" />
				<div className="float-right flex items-center gap-x-6">
					<div className="flex items-center gap-x-4">
						{pathname !== '/new-event' && (
							<PrivilegedContent permissions={[USER_PERMISSIONS.ACTIVITIES_CREATE]}>
								<NavLink
									to="/new-event"
									className="text-base text-grey-700 font-medium hover:scale-110 hover:text-slate-500"
								>
									{t('Post an event')}
								</NavLink>
							</PrivilegedContent>
						)}
						<PrivilegedContent permissions={[USER_PERMISSIONS.SEND_MESSAGES]}>
							<IconButton
								className="text-grey-600"
								onClick={() =>
									sidenavDispatch({
										type: 'open',
										title: t('Messages'),
										content: (
											<ChatroomsListing
												callbackOnClick={() =>
													sidenavDispatch({
														type: 'close',
													})
												}
											/>
										),
									})
								}
							>
								<Icon icon="chat_bubble_outline" />
							</IconButton>
						</PrivilegedContent>
						<PrivilegedContent permissions={[USER_PERMISSIONS.NOTIFICATIONS_RECEIVE]}>
							<NotificationMenu />
						</PrivilegedContent>
					</div>
					<PopupMenu
						ref={popMenuRef}
						open={open}
						onClose={() => setOpen(false)}
						trigger={
							<Button
								className="flex items-center border border-primary bg-transparent px-[10px] py-[5px] rounded-[40px] gap-x-1"
								onClick={() => setOpen(true)}
							>
								<Avatar size="sm" variant="secondary" src={connectedUser?.avatar} />
								<Icon icon="menu" className="text-primary dark:text-white" />
							</Button>
						}
					>
						{connectedUser && connectedUser.accountType !== ACCOUNT_TYPE.GUEST ? (
							[
								<PopupMenuItem key="profile">
									<NavLink to="/user/settings">{t('Profile')}</NavLink>
								</PopupMenuItem>,
								<PopupMenuItem key="favorites">
									<NavLink to="/user/settings/favorites">{t('Favorites')}</NavLink>
								</PopupMenuItem>,
								<PopupMenuItem key="groups">
									<NavLink to="/user/settings/groups">{t('Groups')}</NavLink>
								</PopupMenuItem>,
							]
						) : (
							<></>
						)}
						<PopupSubmenuItem key="locales" title={t('Language')} ref={popMenuRef}>
							<RadioGroup name="locales" onChange={handleLocaleChange}>
								{locales?.results?.map((locale, idx) => (
									<Radio
										key={idx}
										label={locale.description}
										icon={<span className={`rounded-sm fi fi-${locale.flagCode}`}></span>}
										defaultChecked={locale.value === currentLocale}
										value={locale.value}
									/>
								))}
							</RadioGroup>
						</PopupSubmenuItem>
						<PopupSubmenuItem key="themes" title={t('Theme')}>
							<RadioGroup name="themes" onChange={handleThemeSwitch}>
								{themes?.map((theme, idx) => (
									<Radio
										key={idx}
										label={<span className="capitalize">{theme}</span>}
										icon={<Icon icon={theme === 'dark' ? 'dark_mode' : 'light_mode'} />}
										defaultChecked={theme === currentTheme}
										value={theme}
									/>
								))}
							</RadioGroup>
						</PopupSubmenuItem>
						<PopupMenuItem key="about-us">
							<HashLink to="/#about">{t('About us')}</HashLink>
						</PopupMenuItem>
						<PopupMenuItem key="contact-us">
							<HashLink to="/#footer">{t('Contact us')}</HashLink>
						</PopupMenuItem>
						{!connectedUser ? (
							[
								<PopupMenuItem key="login">
									<NavLink to="/login">{t('Log in')}</NavLink>
								</PopupMenuItem>,
								<PopupMenuItem key="signup">
									<NavLink to="/signup">{t('Sign up')}</NavLink>
								</PopupMenuItem>,
							]
						) : connectedUser.accountType === ACCOUNT_TYPE.GUEST ? (
							<PopupMenuItem key="guest-logout" onClick={guestLogout}>
								<span className="cursor-pointer">{t('Stop guest session')}</span>
							</PopupMenuItem>
						) : (
							<PopupMenuItem key="logout" onClick={logout}>
								<span className="cursor-pointer">{t('Logout')}</span>
							</PopupMenuItem>
						)}
					</PopupMenu>
				</div>
			</div>
		</motion.div>
	)
}

export default AppBar
