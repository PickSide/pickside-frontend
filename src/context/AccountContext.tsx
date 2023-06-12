import { createContext, useContext, useEffect, FC } from 'react'
import { useLocalStorage } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setAccount, Account, AppState } from 'state'
import { isEqual } from 'lodash'

export interface AccountContext {
	user?: Account
	preferredTheme?: string | null
	isPremium?: boolean
}

const Context = createContext<AccountContext>({})

export const useAccountContext = () => useContext(Context)

export const AccountProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const { get, set } = useLocalStorage()

	const account = useSelector((state: AppState) => state.account)

	useEffect(() => {
		if (!account) {
			if (!!get('auth')) {
				dispatch<any>(setAccount(get('auth').user))
			}
		}

		if (account && !isEqual(get('auth.user'), account)) {
			set('auth', { ...get('auth'), ...{ user: account } })
		}
	}, [account, dispatch, get, set])

	return <Context.Provider value={{ user: account }}>{children}</Context.Provider>
}

export default Context
