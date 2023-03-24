import { useAsync } from 'react-use'
import { lazyFetch } from 'api'

interface UseRefreshTokenOutputs {
	loading: boolean
	refresh: () => Promise<any>
}

const useRefreshToken = (): UseRefreshTokenOutputs => {
	const { loading, value } = useAsync(async () => await lazyFetch({ endpoint: 'token' }))

	const refresh = async () => {
		// setConnectedUser &&
		// 	setConnectedUser((prev) => {
		// 		console.log(JSON.stringify(prev))
		// 		console.log(value.data.accessToken)
		// 		return {
		// 			...prev,
		// 			roles: value.data.roles,
		// 			accessToken: value.data.accessToken,
		// 		}
		// 	})
		return value.data.accessToken
	}
	return { loading, refresh }
}

export default useRefreshToken
