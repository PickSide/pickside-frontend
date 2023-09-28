import { AppState, User, setCachedUser } from '@state'
import { FC, createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isEqual } from 'lodash'
import { useLocalStorage } from 'react-use'

export interface AccountContext {
	user?: User
	preferredTheme?: string | null
	isPremium?: boolean
}

const Context = createContext<AccountContext>({})

export const useAccountContext = () => useContext(Context)

export const AccountProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const [previousCachedUser, setPreviousCachedUser] = useLocalStorage('user')

	const connectedUser = useSelector((state: AppState) => state.user)

	useEffect(() => {
		if (previousCachedUser && !connectedUser) {
			dispatch<any>(setCachedUser(previousCachedUser))
		}
	}, [])

	useEffect(() => {
		if (!isEqual(previousCachedUser, connectedUser)) {
			console.log('user is not equal to previously cached User')
			setPreviousCachedUser(connectedUser)
		}
	}, [connectedUser])

	return <Context.Provider value={{ user: connectedUser }}>{children}</Context.Provider>
}

export default Context
