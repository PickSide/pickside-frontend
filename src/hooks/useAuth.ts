import { useCallback } from 'react'
import { lazyFetch } from 'api'
import { useEnvVariables } from 'hooks'
import { ENV_VARIABLES } from 'utils/constants'

const useAuth = () => {
    const { appEnv } = useEnvVariables()
    const { authURL } = ENV_VARIABLES[appEnv]
    const login = useCallback(async (data: any) => await lazyFetch({ baseUrl: authURL, endpoint: 'login', data }), [authURL])
    const logout = useCallback(async () => await lazyFetch({ baseUrl: authURL, endpoint: 'logout' }), [authURL])
    return { login, logout }
}

export default useAuth