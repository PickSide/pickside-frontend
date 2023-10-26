import { Dialog, Icon, IconButton, Popover } from '@components'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AppSettings from './Sections/PersonalInfo'
import { AppState } from '@state'
import EditProfile from './Sections/EditProfile'
import Favorites from './Sections/Favorites'
import Groups from './Sections/Groups'
import History from './Sections/ActivityHistory'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const Settings = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const connectedUser = useSelector((state: AppState) => state.user)
	const [openChangeAvatarDialog, setOpenChangeAvatarDialog] = useState<boolean>(false)

	const MenuItems = useMemo(
		() => [
			{
				description: t('Edit Profile'),
				ref: 'edit-profile',
				value: 'edit-profile',
				icon: <Icon icon="account_circle" />,
				content: <EditProfile />,
			},
			{
				description: t('Favorites'),
				ref: 'favorites',
				value: 'favorites',
				icon: <Icon icon="star" />,
				content: <Favorites />,
			},
			{
				description: t('Groups'),
				ref: 'groups',
				value: 'groups',
				icon: <Icon icon="group" />,
				content: <Groups />,
			},
			// {
			// 	description: t('Personal Info'),
			// 	ref: 'personal-info',
			// 	value: 'personal-info',
			// 	icon: <Icon icon="star" />,
			// 	content: <AppSettings />,
			// },
			{
				description: t('Account Management'),
				ref: 'account-management',
				value: 'account-management',
				icon: <Icon icon="settings" />,
				content: <AppSettings />,
			},
			// {
			// 	description: t('Social Media'),
			// 	ref: 'social-media',
			// 	value: 'social-media',
			// 	icon: <MdHistory size={20} />,
			// 	content: <History />,
			// },
			{
				description: t('Privacy'),
				ref: 'privacy',
				value: 'privacy',
				icon: <Icon icon="lock" />,
				content: <History />,
			},
			// {
			// 	description: t('Activity history'),
			// 	ref: 'activity-history',
			// 	value: 'activity-history',
			// 	icon: <BiTime size={20} />,
			// 	content: <History />,
			// },
		],
		[t],
	)

	return (
		<>
			<Dialog title="Change avatar" open={openChangeAvatarDialog} onClose={() => setOpenChangeAvatarDialog(false)}>
				<p>hi</p>
			</Dialog>
			<div className="w-[80%] m-auto flex flex-col divide-y-2 divide-opacity-30 divide-slate-200 h-[calc(100vh-64px)]">
				<div className="inline-flex items-center gap-x-6">
					<div className="relative ">
						<button
							className="absolute rounded-full w-6 h-6 right-0 bottom-0 z-20 bg-primary border-2 border-white text-white hover:bg-secondary"
							onClick={() => setOpenChangeAvatarDialog(true)}
						>
							<Icon icon="edit" size="xs" />
						</button>
						<div className="flex items-center justify-center w-16 h-16 overflow-hidden border-primary border-2 rounded-full text-white bg-primary">
							{connectedUser?.avatar ? (
								<img alt="" src={connectedUser.avatar} />
							) : (
								<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M4.49579 23.3299C4.45167 23.7418 4.08202 24.0399 3.67016 23.9957C3.25831 23.9516 2.9602 23.582 3.00433 23.1701C3.50157 18.5292 7.32488 15 12.0001 15C16.6752 15 20.4986 18.5292 20.9958 23.1701C21.0399 23.582 20.7418 23.9516 20.33 23.9957C19.9181 24.0399 19.5485 23.7418 19.5043 23.3299C19.0878 19.4427 15.8999 16.5 12.0001 16.5C8.10025 16.5 4.91228 19.4427 4.49579 23.3299ZM12.0001 13.5C8.68635 13.5 6.00006 10.8137 6.00006 7.5C6.00006 4.18629 8.68635 1.5 12.0001 1.5C15.3138 1.5 18.0001 4.18629 18.0001 7.5C18.0001 10.8137 15.3138 13.5 12.0001 13.5ZM12.0001 12C14.4853 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4853 3 12.0001 3C9.51478 3 7.50006 5.01472 7.50006 7.5C7.50006 9.98528 9.51478 12 12.0001 12Z"
										fill="white"
									/>
								</svg>
							)}
						</div>
					</div>
					<div className="flex-col my-8">
						<h6 className="font-semibold">{connectedUser?.fullName}</h6>
						<p className="text-base font-normal text-gray-400">Plays near {connectedUser?.localeRegion}</p>
						<p className="text-sm font-normal text-gray-400">Reliability: {connectedUser?.reliability}%</p>
					</div>
					<div className="flex flex-grow my-8 justify-end text-primary pr-2">
						<Popover
							trigger={
								<IconButton>
									<Icon icon="more_vert" />
								</IconButton>
							}
						>
							<div className="flex flex-col gap-y-3 text-black whitespace-nowrap ease-in duration-150 transition-all">
								<button className="hover:text-gray-300 cursor-pointer" onClick={() => setOpenChangeAvatarDialog(true)}>
									{t('Change avatar')}
								</button>
								<button className="text-error cursor-pointer hover:text-red-200">Delete user</button>
							</div>
						</Popover>
					</div>
				</div>
				<div className="block">
					<div className="max-w-[400px] flex flex-col basis-2 py-6 gap-y-4 float-left">
						{MenuItems.map(({ description, ref, icon }, idx) => (
							<div
								key={idx}
								className={`inline-flex items-center gap-x-4 rounded-md h-10 hover:bg-slate-200 px-2 leading-8 ${
									pathname.includes(ref) ? 'font-semibold bg-slate-100' : ''
								}`}
							>
								{icon}
								<NavLink className="flex-grow whitespace-nowrap" to={ref}>
									{description}
								</NavLink>
							</div>
						))}
					</div>
					<div className="flex justify-center overflow-scroll">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	)
}

export default Settings
