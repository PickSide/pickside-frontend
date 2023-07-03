import { AiFillEdit, AiOutlineTeam } from 'react-icons/ai'
import { Button, Chip, Dialog, IconDropdown, MenuItem, Popover, Tab, Tabs } from 'components'
import { FiMoreVertical, FiSettings } from 'react-icons/fi'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'

import AppSettings from './Sections/PersonalInfo'
import { AppState } from 'state'
import { BiTime } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import EditProfile from './Sections/EditProfile'
import History from './Sections/ActivityHistory'
import { MdHistory } from 'react-icons/md'
import { useDevice } from 'hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const Settings = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { isMobile } = useDevice()
	const connectedUser = useSelector((state: AppState) => state.user)
	const [activeSection, setActiveSection] = useState<string>(pathname)
	const [openChangeAvatarDialog, setOpenChangeAvatarDialog] = useState<boolean>(false)
	const [openPopover, setOpenPopover] = useState<boolean>(false)

	const MenuItems = useMemo(
		() => [
			{
				description: t('Edit Profile'),
				ref: 'edit-profile',
				value: 'edit-profile',
				icon: <CgProfile size={20} />,
				content: <EditProfile />,
			},
			{
				description: t('Personal Info'),
				ref: 'personal-info',
				value: 'personal-info',
				icon: <FiSettings size={20} />,
				content: <AppSettings />,
			},
			{
				description: t('Account Management'),
				ref: 'account-management',
				value: 'account-management',
				icon: <FiSettings size={20} />,
				content: <AppSettings />,
			},
			{
				description: t('Social Media'),
				ref: 'social-media',
				value: 'social-media',
				icon: <MdHistory size={20} />,
				content: <History />,
			},
			{
				description: t('Privacy'),
				ref: 'privacy',
				value: 'privacy',
				icon: <MdHistory size={20} />,
				content: <History />,
			},
			{
				description: t('Activity history'),
				ref: 'activity-history',
				value: 'activity-history',
				icon: <BiTime size={20} />,
				content: <History />,
			},
		],
		[t],
	)

	const UserPageMobile = () => (
		<div className="flex flex-col text-slate-950">
			<div className="relative h-[100px] bg-gray-200">
				<div className="absolute left-4 top-full -translate-y-1/2 w-16 h-16 overflow-hidden border-white border-4 rounded-full bg-gray-100 cursor-pointer"></div>
			</div>
			<div className="p-4 mt-6 flex flex-col">
				<p className="text-2xl font-semibold">
					{connectedUser?.firstName} {connectedUser?.lastName}
				</p>
				<p className="text-sm text-gray-500">@{connectedUser?.username}</p>
				<p className="text-sm text-gray-500">
					{t('Reliability')}: {connectedUser?.reliability}%
				</p>
			</div>
			<div className="p-4 flex flex-col">
				<Outlet />
			</div>
		</div>
	)

	return (
		<>
			<Dialog title="Change avatar" open={openChangeAvatarDialog} onClose={() => setOpenChangeAvatarDialog(false)}>
				<p>hi</p>
			</Dialog>
			{isMobile ? (
				<UserPageMobile />
			) : (
				<div className="w-[80%] m-auto flex flex-col divide-y-2 divide-opacity-30 divide-slate-200 h-[calc(100vh-64px)]">
					<div className="inline-flex items-center gap-x-6">
						<div className="relative ">
							<button
								className="absolute rounded-full w-6 h-6 right-0 bottom-0 z-20 bg-primary text-white hover:bg-secondary"
								onClick={() => setOpenChangeAvatarDialog(true)}
							>
								<AiFillEdit className=" m-auto" size={15} />
							</button>
							<div className="w-16 h-16 overflow-hidden border-primary border-2 rounded-full bg-gray-100">
								<svg
									className="absolute w-10 h-10 text-gray-400 m-auto inset-0 z-10"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
						</div>
						<div className="flex-col my-8">
							<p className="text-[30px] font-semibold">{connectedUser?.firstName + ' ' + connectedUser?.lastName}</p>
							<p className="text-[15px] font-normal text-gray-400">Plays near {connectedUser?.localeRegion}</p>
							<p className="text-[15px] font-normal text-gray-400">Reliability: {connectedUser?.reliability}%</p>
						</div>
						<div className="flex flex-grow my-8 justify-end text-primary pr-2">
							<Popover
								trigger={
									<button className="text-primary">
										<FiMoreVertical size={20} />
									</button>
								}
							>
								<div className="flex flex-col gap-y-3 text-black whitespace-nowrap ease-in duration-150 transition-all">
									<button
										className="hover:text-gray-300 cursor-pointer"
										onClick={() => setOpenChangeAvatarDialog(true)}
									>
										Change avatar
									</button>
									<button className="text-error cursor-pointer hover:text-red-200">Delete user</button>
								</div>
							</Popover>
						</div>
					</div>
					<div className="flex flex-grow">
						<div className="min-w-[200px] flex flex-col py-6 gap-y-4 ">
							{MenuItems.map(({ description, ref, icon }, idx) => (
								<div
									key={idx}
									className={`inline-flex items-center gap-x-4 rounded-md h-10 hover:bg-slate-200 px-2 text-[18px] leading-8 ${
										pathname.includes(ref) ? 'font-semibold bg-slate-100' : ''
									}`}
								>
									{icon}
									<NavLink
										className="flex-grow text-[15px] whitespace-nowrap"
										to={ref}
										onClick={() => setActiveSection(`/user/${ref}`)}
									>
										{description}
									</NavLink>
								</div>
							))}
						</div>
						<div className="overflow-y-auto p-6 w-full h-full">
							<Outlet />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Settings
