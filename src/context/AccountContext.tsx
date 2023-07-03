import { AppState, User, setUser } from 'state'
import { FC, createContext, useContext, useEffect } from 'react'
import { isEqual, merge } from 'lodash'
import { useApi, useLocalStorage } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'

export interface AccountContext {
	user?: User
	preferredTheme?: string | null
	isPremium?: boolean
}

const Context = createContext<AccountContext>({})

export const useAccountContext = () => useContext(Context)

export const AccountProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const { get, set } = useLocalStorage()
	const { getNotifications } = useApi()

	const user = useSelector((state: AppState) => state.user)

	useEffect(() => {
		const auth = get('auth')
		if (!user && !!auth) {
			dispatch<any>(setUser(auth.user))
		}

		if (user && !isEqual(auth.user, user)) {
			set('auth', merge(auth, { user }))
		}
	}, [user, dispatch, get, set])

	useEffect(() => {
		if (user) {
			dispatch<any>(getNotifications())
		}
	}, [user])

	return <Context.Provider value={{ user: user }}>{children}</Context.Provider>
}

export default Context
