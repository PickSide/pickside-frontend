import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { AppState } from '@state'
import { FC } from 'react'
import { useSelector } from 'react-redux'

const RequireAuth: FC<any> = () => {
	const user = useSelector((state: AppState) => state.user)
	const location = useLocation()
	return !!user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth
