import { FC, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { MdAccountCircle, MdOutlineSettings, MdPersonOutline, MdLogout, MdOutlineHistory } from 'react-icons/md'
import { AppState } from 'state'
import { useAuth } from 'hooks'
import { IconDropdown, MenuItem } from 'components'

const ProfileMenu: FC<any> = () => {
	const { logout } = useAuth()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const account = useSelector((state: AppState) => state.account)

	const userInitials = useMemo(() => `${account?.firstName?.charAt(0)}${account?.lastName?.charAt(0)}`, [account])

	const UserMenuItems = [
		{
			label: t('Profile'),
			icon: <MdPersonOutline size={20} />,
			action: () => navigate('/user/profile'),
		},
		{
			label: t('Settings'),
			icon: <MdOutlineSettings size={20} />,
			action: () => navigate('/user/app-settings'),
		},
		{
			label: t('History'),
			icon: <MdOutlineHistory size={20} />,
			action: () => navigate('/user/history'),
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
