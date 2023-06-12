import { Dispatch } from '@reduxjs/toolkit'
import { useCalls, useLocalStorage } from 'hooks'
import { AUTH_URL } from 'api'
import { logout, setAccount } from 'state'

interface UseAuthOutput {
	create: (d: any) => (d: Dispatch) => Promise<any>
	login: (d: any) => (d: Dispatch) => Promise<any>
	logout: () => (d: Dispatch) => Promise<any>
}

const useAuth = (): UseAuthOutput => {
	const { postItem } = useCalls({ baseURL: AUTH_URL })
	const { remove, get, set } = useLocalStorage()

	return {
		create: (data: any) =>
			async (dispatch: Dispatch): Promise<any> => {
				return await postItem({ endpoint: 'account/create', data })(dispatch).then((response) => {
					if (response.payload) {
						dispatch<any>(setAccount(response.user))
						remove('auth')
						set('auth', response)
					}
					return response
				})
			},
		login:
			(data: any) =>
				async (dispatch: Dispatch): Promise<any> => {
					return await postItem({ endpoint: 'login', data })(dispatch)
						.then((response) => {
							if (response.user) {
								dispatch<any>(setAccount(response.user))
								remove('auth')
								set('auth', response)
							}
							return response
						})

				},
		logout:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await postItem({ endpoint: 'logout' })(dispatch)
					if (items) {
						dispatch<any>(logout())
						remove('auth')
					}
				},
	}
}

export default useAuth
