import { useAsync } from 'react-use'
import { fetchItemsNoDispatch } from 'api'
import { useAuth } from 'hooks'

interface UseRefreshTokenOutputs {
	loading: boolean
	refresh: () => Promise<any>
}

const useRefreshToken = (): UseRefreshTokenOutputs => {
	const { auth, setAuthConfig } = useAuth()
	const { loading, value } = useAsync(async () => await fetchItemsNoDispatch({ method: 'GET', endpoint: 'refresh' }))

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
