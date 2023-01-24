import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { User } from 'state/user'
import { fetchAppConfiguration } from 'state/config'
import { useDispatch } from 'react-redux'

export interface AuthConfig {
	connectedUser?: User
	accessToken?: string
}

export interface AuthContextProps {
	auth?: AuthConfig
	setAuth?: Dispatch<SetStateAction<AuthConfig>>
}

const AuthContext = createContext<AuthContextProps>({})

export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch()

	const [auth, setAuth] = useState<AuthConfig>({})

	useEffect(() => {
		if (auth.connectedUser && auth.accessToken) {
			dispatch<any>(fetchAppConfiguration())
		}
	}, [auth])

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
