import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { User } from 'state/user'

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
	const [auth, setAuth] = useState<AuthConfig>({})

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
