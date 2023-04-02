import { Dispatch } from '@reduxjs/toolkit'
import { login, logout } from 'api'
import { useLocalStorage } from 'hooks'
import { setAccount } from 'state/account'

interface UseAuthOutput {
    login: (d: any) => (d: Dispatch) => Promise<any>
    logout: () => (d: Dispatch) => Promise<any>
}

const useAuth = (): UseAuthOutput => {
    const { remove, set } = useLocalStorage()

    return {
        login: (data: any) => async (dispatch: Dispatch): Promise<any> => {
            const items = await login(data)(dispatch)

            if (items) {
                dispatch<any>(setAccount(items.user))
                remove('user')
                set('user', items)
            }
        },
        logout: () => async (dispatch: Dispatch): Promise<any> => {
            const items = await logout()(dispatch)
            if (items) {
                console.log(items)
            }
        }
    }
}

export default useAuth