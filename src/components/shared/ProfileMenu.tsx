import { Dropdown, Icon, MenuItem } from '@components'
import { FC, useMemo } from 'react'
import { MdGroups2, MdLogout, MdOutlineEventAvailable, MdOutlineSettings } from 'react-icons/md'

import { AppState } from '@state'
import { useLogout } from '@hooks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ProfileMenu: FC<any> = () => {
	const { logout } = useLogout()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const userInitials = useMemo(() => `${connectedUser?.fullName}`, [connectedUser])

	const UserMenuItems = [
		{
			label: t('Upcoming events'),
			icon: <MdOutlineEventAvailable size={20} />,
			action: () => navigate('/user/upcoming-events'),
		},
		{
			label: t('Groups'),
			icon: <MdGroups2 size={20} />,
			action: () => navigate('/user/groups'),
		},
		{
			label: t('Settings'),
			icon: <MdOutlineSettings size={20} />,
			action: () => navigate('/user/settings'),
		},
		{
			label: t('Logout'),
			icon: <MdLogout size={20} />,
			action: async () => {
				logout()
				navigate('/login')
			},
		},
	]

	return (
		<Dropdown
			icon={
				<div className="w-10 h-10 flex items-center justify-center rounded-full bg-grey-600">
					<Icon icon="person" className="text-white" />
				</div>
			}
		>
			<MenuItem disabled>{userInitials}</MenuItem>
			{UserMenuItems.map(({ action, label, icon }, idx) => (
				<MenuItem key={idx} icon={icon} onClick={() => action()}>
					{label}
				</MenuItem>
			))}
		</Dropdown>
	)
}
export default ProfileMenu
