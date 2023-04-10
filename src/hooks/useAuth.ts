import { useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { login, logout, axiosPrivate } from 'api'
import { useLocalStorage, useRefreshToken } from 'hooks'
import { setAccount } from 'state/account'

interface UseAuthOutput {
	login: (d: any) => (d: Dispatch) => Promise<any>
	logout: () => (d: Dispatch) => Promise<any>
}

const useAuth = (): UseAuthOutput => {
	const { remove, get, set } = useLocalStorage()
	const { refresh } = useRefreshToken()

	return {
		login:
			(data: any) =>
			async (dispatch: Dispatch): Promise<any> => {
				const items = await login(data)(dispatch)

				if (items) {
					dispatch<any>(setAccount(items.user))
					remove('user')
					set('user', items)
				}
			},
		logout:
			() =>
			async (dispatch: Dispatch): Promise<any> => {
				const items = await logout(get('user'))(dispatch)
				if (items) {
					setAccount(null)
					remove('user')
				}
			},
	}
}

export default useAuth
