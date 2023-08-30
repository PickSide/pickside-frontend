import { refreshToken as refresh } from '@api'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from 'react-use'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

const useRefreshToken = () => {
	const [previousCachedTokens] = useLocalStorage('auth')

	const { mutate: refreshToken, isLoading } = useMutation(refresh, {
		onSuccess: ({ data }) => {
			console.log(data)
		},
		onError: (error) => console.log(error),
	})
	return { refreshToken, isLoading }
}

export default useRefreshToken
