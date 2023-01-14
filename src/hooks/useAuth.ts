import { useContext, useEffect } from 'react'
import { useLocalStorage } from 'hooks'
import { AuthConfig, AuthContext } from 'utils'

const useAuth = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const { set } = useLocalStorage()

	useEffect(() => {
		if (auth?.accessToken && auth?.connectedUser) {
			set('auth', JSON.stringify(auth))
		}
	}, [auth])

	const setAuthConfig = (authConfig: AuthConfig) => setAuth && setAuth(authConfig)
	const removeAuthConfig = () => setAuth && setAuth({})

	return { auth, setAuthConfig, removeAuthConfig }
}

export default useAuth
