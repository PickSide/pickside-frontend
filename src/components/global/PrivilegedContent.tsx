import { FC, PropsWithChildren } from 'react'

import { AppState } from '@state'
import { USER_PERMISSIONS } from '@state/me/constants'
import { useSelector } from 'react-redux'

interface PrivilegedContentProps extends PropsWithChildren {
	permissions?: USER_PERMISSIONS[]
}

const PrivilegedContent: FC<PrivilegedContentProps> = ({ children, permissions = [] }) => {
	const me = useSelector((state: AppState) => state.user)

	if (
		!me ||
		!permissions.length ||
		!permissions.every((perm) => me.permissions?.includes(perm))
	) {
		return null
	}

	return <>{children}</>
}

export default PrivilegedContent
