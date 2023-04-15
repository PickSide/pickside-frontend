import { FC } from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

const RequireAuth: FC<any> = () => {
	const user = useSelector((state: AppState) => state.account)
	const location = useLocation()
	console.log(!!user, location)
	return !!user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth
