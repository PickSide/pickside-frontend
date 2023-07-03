import { FC, useMemo } from 'react'
import { IconDropdown, MenuItem } from 'components'
import { MdAccountCircle, MdGroups2, MdLogout, MdOutlineEventAvailable, MdOutlineSettings } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import { useApi } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ProfileMenu: FC<any> = () => {
	const { logout } = useApi()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const user = useSelector((state: AppState) => state.user)

	const userInitials = useMemo(() => `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`, [user])

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
				await dispatch<any>(logout())
				navigate('/login')
			},
		},
	]

	return (
		<IconDropdown icon={<MdAccountCircle size={20} />}>
			<MenuItem disabled>{userInitials}</MenuItem>
			{UserMenuItems.map(({ action, label, icon }, idx) => (
				<MenuItem key={idx} icon={icon} onClick={() => action()}>
					{label}
				</MenuItem>
			))}
		</IconDropdown>
	)
}
export default ProfileMenu
