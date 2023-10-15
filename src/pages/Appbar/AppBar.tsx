import { Icon, Radio, RadioGroup } from '@components'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { cn, pageTransition } from '@utils'
import { useDevice, useLocaleSwitcher, useLogout, useOnScreen } from '@hooks'
import { useMemo, useRef, useState } from 'react'

import { AppState } from '@state'
import Button from '../../components/shared/Button'
import PopupMenu from './components/PopupMenu'
import PopupMenuItem from './components/shared/PopupMenuItem'
import PopupSubmenuItem from './components/shared/PopupSubmenuItem'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import useThemeSwitcher from './hooks/useThemeSwitcher'
import { useTranslation } from 'react-i18next'

const ROUTES_TO_EXCLUDE_BAR: any = []
const ROUTES_TO_INCLUDE_BACK_BUTTON = ['/home']

const AppBar = () => {
	const ref = useRef<HTMLButtonElement | null>(null)
	const popMenuRef = useRef<any>(null)
	const { handleLocaleChange, locales, current: currentLocale } = useLocaleSwitcher()
	const { handleThemeSwitch, themes, current: currentTheme } = useThemeSwitcher()
	const { logout } = useLogout()
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const onScreen = useOnScreen(ref, '80px')

	const [open, setOpen] = useState<boolean>(false)
	const connectedUser = useSelector((state: AppState) => state.user)

	const showAppBar = useMemo(() => !ROUTES_TO_EXCLUDE_BAR.includes(pathname), [pathname])
	const showBackButton = useMemo(() => {
		return !onScreen && ROUTES_TO_INCLUDE_BACK_BUTTON.includes(pathname)
	}, [onScreen, pathname])

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className={cn(
				'flex h-16 pl-5 pr-16 w-full dark:bg-charcoal-black ',
				pathname === '/' || pathname === '/home' ? 'bg-landing-texture' : 'bg-[#F1F4F3]',
			)}
		>
			<div className="w-full h-10 my-auto">
				<NavLink to="/home" className="float-left w-12 h-full bg-templogo2 bg-contain bg-no-repeat" />
				<div className="float-right flex items-center gap-x-6">
					{pathname !== '/new-event' && connectedUser && (
						<NavLink to="/new-event">
							<h5>{t('Post event')}</h5>
						</NavLink>
					)}
					<PopupMenu
						className="text-lg"
						ref={popMenuRef}
						open={open}
						onClose={() => setOpen(false)}
						trigger={
							<Button
								className="flex items-center border border-primary bg-transparent px-[10px] py-[5px] rounded-[40px] gap-x-1"
								onClick={() => setOpen(true)}
							>
								<div className="w-7 h-7 flex justify-center items-center rounded-full bg-primary">
									{connectedUser ? (
										<img className="rounded-full" src={connectedUser?.avatar} alt="" />
									) : (
										<svg width="16" height="16" viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M4.49579 23.3299C4.45167 23.7418 4.08202 24.0399 3.67016 23.9957C3.25831 23.9516 2.9602 23.582 3.00433 23.1701C3.50157 18.5292 7.32488 15 12.0001 15C16.6752 15 20.4986 18.5292 20.9958 23.1701C21.0399 23.582 20.7418 23.9516 20.33 23.9957C19.9181 24.0399 19.5485 23.7418 19.5043 23.3299C19.0878 19.4427 15.8999 16.5 12.0001 16.5C8.10025 16.5 4.91228 19.4427 4.49579 23.3299ZM12.0001 13.5C8.68635 13.5 6.00006 10.8137 6.00006 7.5C6.00006 4.18629 8.68635 1.5 12.0001 1.5C15.3138 1.5 18.0001 4.18629 18.0001 7.5C18.0001 10.8137 15.3138 13.5 12.0001 13.5ZM12.0001 12C14.4853 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4853 3 12.0001 3C9.51478 3 7.50006 5.01472 7.50006 7.5C7.50006 9.98528 9.51478 12 12.0001 12Z"
												fill="white"
											/>
										</svg>
									)}
								</div>
								<Icon icon="menu" size="sm" className="dark:text-white" />
							</Button>
						}
					>
						{connectedUser ? (
							[
								<PopupMenuItem>
									<NavLink to="/user/settings">{t('Profile')}</NavLink>
								</PopupMenuItem>,
								<PopupMenuItem>
									<NavLink to="/favorites">{t('Favorites')}</NavLink>
								</PopupMenuItem>,
							]
						) : (
							<></>
						)}
						<PopupSubmenuItem title={t('Language')} ref={popMenuRef}>
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
						<PopupSubmenuItem title={t('Theme')}>
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
						<PopupMenuItem>
							<NavLink to="">{t('About us')}</NavLink>
						</PopupMenuItem>
						<PopupMenuItem>
							<NavLink to="">{t('Contact us')}</NavLink>
						</PopupMenuItem>
						{!connectedUser ? (
							[
								<PopupMenuItem>
									<NavLink to="/login">{t('Log in')}</NavLink>
								</PopupMenuItem>,
								<PopupMenuItem>
									<NavLink to="/signup">{t('Sign up')}</NavLink>
								</PopupMenuItem>,
							]
						) : (
							<PopupMenuItem onClick={() => logout()}>
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
