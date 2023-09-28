import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useLocalStorage } from 'react-use'
import { useMutation } from '@tanstack/react-query'

const useRefreshToken = () => {
	const [previousCachedTokens] = useLocalStorage('auth')
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async () => await axiosInstance.get('/token')

	const { mutate: refreshToken, isLoading } = useMutation(callback, {
		mutationKey: ['refreshToken'],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => console.log(error),
	})
	return { refreshToken, isLoading }
}

export default useRefreshToken
