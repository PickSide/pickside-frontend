import { Dialog, Icon, IconButton, Popover } from '@components'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AppSettings from './Sections/PersonalInfo'
import { AppState } from '@state'
import Avatar from '@components/Avatar'
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
							<Avatar size="sm" variant="secondary" src={connectedUser?.avatar} />
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
