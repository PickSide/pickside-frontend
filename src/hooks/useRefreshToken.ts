import { useAsync, useLocalStorage } from 'react-use'

import { getItem } from 'utils'

interface UseRefreshTokenOutputs {
	loading: boolean
	refresh: () => Promise<any>
}

const useRefreshToken = (): UseRefreshTokenOutputs => {
	const { loading, value } = useAsync(async () => await getItem({ endpoint: 'token' }))
	const [previousCachedTokens] = useLocalStorage('auth')

	const refresh = async () => ({
		previousCachedTokens
	})

	return { loading, refresh }
}

export default useRefreshToken
