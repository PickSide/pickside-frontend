import { FC } from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from 'hooks'

const RequireAuth: FC<any> = () => {
	const { auth } = useAuth()
	const location = useLocation()

	return auth?.connectedUser ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth
