import { useAsync } from 'react-use'
import { lazyFetch } from 'api'
import useLocalStorage from './useLocalStorage'

interface UseRefreshTokenOutputs {
	loading: boolean
	refresh: () => Promise<any>
}

const useRefreshToken = (): UseRefreshTokenOutputs => {
	const { loading, value } = useAsync(async () => await lazyFetch({ endpoint: 'token' }))
	const { get, set } = useLocalStorage()

	const refresh = async () => {
		console.log(value)
		get('user')
	}
	return { loading, refresh }
}

export default useRefreshToken
