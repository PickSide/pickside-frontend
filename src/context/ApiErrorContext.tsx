import { createContext, useContext, useEffect, FC } from 'react'
import { useLocalStorage } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setAccount, AppState } from 'state'

export interface ApiErrorContext {
	error?: any
}

const Context = createContext<ApiErrorContext>({})

export const useAccountContext = () => useContext(Context)

export const ApiErrorProvider: FC<any> = ({ children }) => {
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

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
