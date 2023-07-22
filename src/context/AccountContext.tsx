import { AppState, User, setUser } from 'state'
import { FC, createContext, useContext, useEffect } from 'react'
import { isEmpty, isEqual, merge } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { useApi } from 'hooks'
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
	const [previousCachedUser] = useLocalStorage('user')
	const { getNotifications } = useApi()

	const connectedUser = useSelector((state: AppState) => state.user)

	useEffect(() => {
		if (previousCachedUser) {
			console.log(previousCachedUser)
			dispatch<any>(setUser(previousCachedUser))
		}
	}, [])

	// useEffect(() => {
	// 	if (connectedUser) {
	// 		dispatch<any>(getNotifications())
	// 	}
	// }, [])

	return <Context.Provider value={{ user: connectedUser }}>{children}</Context.Provider>
}

export default Context
