import { createContext, useContext, useEffect, useState, FC } from 'react'
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

	const stateAccount = useSelector((state: AppState) => state.account)
	const [connectedAccount, setConnectedAccount] = useState(get('user'))

	useEffect(() => {
		if (!!connectedAccount) {
			dispatch<any>(setAccount(connectedAccount))
		}
	}, [])

	// useEffect(() => {
	// 	if (!stateAccount &&) {
	// 		dispatch<any>(setAccount(connectedAccount))
	// 	}
	// }, [stateAccount])

	return <Context.Provider value={connectedAccount}>{children}</Context.Provider>
}

export default Context
