import { Icon } from "@components"

const JoinGroupNotification = ({ notification }) => {
    console.log(notification)
    return (
        <div className="relative flex justify-between">
            {/* {!notification.isRead && <Icon className="text-blue-400" icon='notifications_active' />}
            {notification.message} */}
        </div>
    )
}

export default JoinGroupNotification