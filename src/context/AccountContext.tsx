import { createContext, useContext, useEffect, FC } from 'react'
import { useLocalStorage } from 'hooks'
import { setAccount, Account } from 'state/account'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'

export interface AccountContext {
	user?: Account
	preferredTheme?: string | null
	isPremium?: boolean
}

const Context = createContext<AccountContext>({})

export const useAccountContext = () => useContext(Context)

export const AccountProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const { get } = useLocalStorage()

	const account = useSelector((state: AppState) => state.account)

	useEffect(() => {
		if (!account) {
			if (!!get('auth')) {
				dispatch<any>(setAccount(get('auth').user))
			}
		}
	}, [account, dispatch, get])

	return <Context.Provider value={{ user: account }}>{children}</Context.Provider>
}

export default Context
