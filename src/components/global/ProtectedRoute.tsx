import { ACCOUNT_TYPE, USER_PERMISSIONS } from '@state/me/constants'
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
	const me = useSelector((state: AppState) => state.user)

	const location = useLocation()

	const userHasNecessaryPermissions = useMemo(() => {
		if (!permissions || !permissions.length) {
			return true
		}
		return permissions?.every((permission) => me?.permissions?.includes(permission))
	}, [permissions, me])

	const userIsGuest = useMemo(() => me?.accountType === ACCOUNT_TYPE.GUEST, [me])

	if (!me || !userHasNecessaryPermissions || (!allowsGuestAccount && userIsGuest)) {
		return <Navigate to="/" state={{ from: location }} replace />
	}

	return children
}

export default ProtectedRoute
