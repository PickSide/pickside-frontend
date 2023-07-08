import { getItem } from 'utils'
import { useAsync } from 'react-use'
import useLocalStorage from './useLocalStorage'

interface UseRefreshTokenOutputs {
	loading: boolean
	refresh: () => Promise<any>
}

const useRefreshToken = (): UseRefreshTokenOutputs => {
	const { loading, value } = useAsync(async () => await getItem({ endpoint: 'token' }))
	const { get, set } = useLocalStorage()

	const refresh = async () => {
		get('auth')
	}
	return { loading, refresh }
}

export default useRefreshToken
