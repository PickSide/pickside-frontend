import { FC, ReactNode, useContext, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ROLES, USER_PERMISSIONS } from '@state/user/constants'

import { AccountContext } from '@context'

interface ProtectedRouteProps {
	allowsGuestAccount?: boolean
	permissions?: USER_PERMISSIONS[]
	children?: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ permissions = [], allowsGuestAccount = false, children }) => {
	const { user } = useContext(AccountContext)

	const location = useLocation()

	const userHasNecessaryPermissions = useMemo(() => {
		if (!permissions || !permissions.length) {
			return true
		}
		return permissions?.every((permission) => user?.permissions?.includes(permission))
	}, [permissions, user])

	const userIsGuest = useMemo(() => user?.role === ROLES.GUEST, [user])

	if (!user || !userHasNecessaryPermissions || (!allowsGuestAccount && userIsGuest)) {
		return <Navigate to="/" state={{ from: location }} replace />
	}

	return children
}

export default ProtectedRoute
