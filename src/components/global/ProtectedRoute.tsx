import { ACCOUNT_TYPE, USER_PERMISSIONS } from '@state/user/constants'
import { FC, ReactNode, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { AppState } from '@state'
import { useSelector } from 'react-redux'

interface ProtectedRouteProps {
	allowsGuestAccount?: boolean
	permissions?: USER_PERMISSIONS[]
	children?: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ permissions = [], allowsGuestAccount = false, children }) => {
	const connectedUser = useSelector((state: AppState) => state.user)

	const location = useLocation()

	const userHasNecessaryPermissions = useMemo(() => {
		if (!permissions || !permissions.length) {
			return true
		}
		return permissions?.every((permission) => connectedUser?.permissions?.includes(permission))
	}, [permissions, connectedUser])

	const userIsGuest = useMemo(() => connectedUser?.accountType === ACCOUNT_TYPE.GUEST, [connectedUser])

	if (!connectedUser || !userHasNecessaryPermissions || (!allowsGuestAccount && userIsGuest)) {
		return <Navigate to="/" state={{ from: location }} replace />
	}

	return children
}

export default ProtectedRoute
