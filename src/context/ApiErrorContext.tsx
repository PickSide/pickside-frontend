import { AppState, setUser } from '@state'
import { FC, createContext, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocalStorage } from 'react-use'

export interface ApiErrorContext {
	error?: any
}

const Context = createContext<ApiErrorContext>({})

export const useAccountContext = () => useContext(Context)

export const ApiErrorProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()
	const [previousCachedUser] = useLocalStorage('user')

	const user = useSelector((state: AppState) => state.user)

	useEffect(() => {
		// if (!user) {
		// 	if (!!get('user')) {
		// 		dispatch<any>(setUser(get('user')))
		// 	}
		// }
	}, [user, dispatch])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
