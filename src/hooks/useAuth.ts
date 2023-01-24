import { useContext, useEffect } from 'react'
import { useLocalStorage } from 'hooks'
import { AuthContext } from 'utils/context'
import { AuthConfig } from 'utils/context/AuthContext'

const useAuth = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const { set } = useLocalStorage()

	useEffect(() => {
		set('auth', JSON.stringify(auth))
	}, [auth])

	const setAuthConfig = (authConfig: AuthConfig) => setAuth && setAuth(authConfig)
	const removeAuthConfig = () => setAuth && setAuth({})

	return { auth, setAuthConfig, removeAuthConfig }
}

export default useAuth
