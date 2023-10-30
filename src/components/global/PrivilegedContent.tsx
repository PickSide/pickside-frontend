import { FC, PropsWithChildren } from 'react'

import { AppState } from '@state'
import { USER_PERMISSIONS } from '@state/user/constants'
import { useSelector } from 'react-redux'

interface PrivilegedContentProps extends PropsWithChildren {
	permissions?: USER_PERMISSIONS[]
}

const PrivilegedContent: FC<PrivilegedContentProps> = ({ children, permissions = [] }) => {
	const connectedUser = useSelector((state: AppState) => state.user)

	if (
		!connectedUser ||
		!permissions.length ||
		!permissions.every((perm) => connectedUser.permissions?.includes(perm))
	) {
		return null
	}

	return <>{children}</>
}

export default PrivilegedContent
