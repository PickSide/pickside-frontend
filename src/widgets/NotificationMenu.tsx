import { FC } from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineNotifications } from 'react-icons/md'
import { IconDropdown, MenuItem } from 'components'
import { AppState } from 'state'

const NotificationMenu: FC<any> = () => {
	const notifications = useSelector((state: AppState) => state.notifications)

	return (
		<div>
			<IconDropdown icon={<MdOutlineNotifications size={25} />}>
				{notifications?.results?.map((notification, idx) => (
					<MenuItem
						key={idx}
						onClick={() => {
							//todo
						}}
					></MenuItem>
				))}
			</IconDropdown>
		</div>
	)
}
export default NotificationMenu
