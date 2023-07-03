import { AppState, setUser } from 'state'
import { FC, createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocalStorage } from 'hooks'

export interface ApiErrorContext {
	error?: any
}

const Context = createContext<ApiErrorContext>({})

export const useAccountContext = () => useContext(Context)

export const ApiErrorProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const { get } = useLocalStorage()

	const user = useSelector((state: AppState) => state.user)

	useEffect(() => {
		if (!user) {
			if (!!get('auth')) {
				dispatch<any>(setUser(get('auth').user))
			}
		}
	}, [user, dispatch, get])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
