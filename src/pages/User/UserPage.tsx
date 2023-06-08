import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppSettings from './Sections/AppSettings'
import History from './Sections/History'
import ProfileSettings from './Sections/ProfileSettings'
import { AiOutlineTeam } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import { MdHistory } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import { AppState } from 'state'

const UserPage = () => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const connectedUser = useSelector((state: AppState) => state.account)
	const [activeSection, setActiveSection] = useState<string>(pathname)

	const MenuItems = useMemo(
		() => [
			{
				description: t('Profile'),
				ref: 'profile',
				value: 'profile',
				icon: <CgProfile size={25} />,
				content: <ProfileSettings />,
			},
			{
				description: t('Settings'),
				ref: 'app-settings',
				value: 'appsettings',
				icon: <FiSettings size={25} />,
				content: <AppSettings />,
			},
			{
				description: t('Team'),
				ref: 'team',
				value: 'team',
				icon: <AiOutlineTeam size={25} />,
				content: <History />,
			},
			{
				description: t('Recently'),
				ref: 'recently',
				value: 'recently',
				icon: <MdHistory size={25} />,
				content: <History />,
			},
			{
				description: t('History'),
				ref: 'history',
				value: 'history',
				icon: <BiTime size={25} />,
				content: <History />,
			},
		],
		[t],
	)

	return (
		<div className="w-[80%] m-auto flex flex-col divide-y-2 divide-opacity-30 divide-slate-200 h-[calc(100vh-64px)]">
			<div className="inline-flex items-center gap-x-6">
				<div className="relative w-16 h-16 overflow-hidden rounded-full bg-gray-100">
					<svg
						className="absolute w-10 h-10 text-gray-400 m-auto inset-0"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clip-rule="evenodd"
						></path>
					</svg>
				</div>
				<p className="text-[30px] font-semibold my-8">
					{connectedUser?.profile?.firstName + ' ' + connectedUser?.profile?.lastName}
				</p>
				<p className="text-[15px] font-semibold my-8"></p>
			</div>
			<div className="flex flex-grow">
				<div className="min-w-[200px] flex flex-col py-6 gap-y-4 ">
					{MenuItems.map(({ description, ref, icon }, idx) => (
						<div
							className={`inline-flex items-center gap-x-4 rounded-md h-10 hover:bg-slate-200 px-2 text-[18px] leading-8 ${
								pathname.includes(ref) ? 'font-semibold bg-slate-100' : ''
							}`}
						>
							{icon}
							<NavLink className="flex-grow" to={ref} key={idx} onClick={() => setActiveSection(`/user/${ref}`)}>
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
	)
}

export default UserPage
