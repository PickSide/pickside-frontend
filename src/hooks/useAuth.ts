import { Dispatch } from '@reduxjs/toolkit'
import { useCalls, useLocalStorage } from 'hooks'
import { AUTH_URL } from 'api'
import { setAccount } from 'state'

interface UseAuthOutput {
	login: (d: any) => (d: Dispatch) => Promise<any>
	logout: () => (d: Dispatch) => Promise<any>
}

const useAuth = (): UseAuthOutput => {
	const { postItem } = useCalls({ baseURL: AUTH_URL })
	const { remove, get, set } = useLocalStorage()

	return {
		login:
			(data: any) =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await postItem({ endpoint: 'login', data })(dispatch)

					if (items) {
						dispatch<any>(setAccount(items.user))
						remove('auth')
						set('auth', items)
					}
				},
		logout:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await postItem({ endpoint: 'logout' })(dispatch)
					if (items) {
						dispatch<any>(setAccount(null))
						remove('auth')
					}
				},
	}
}

export default useAuth
