import { AxiosContext } from '@context'
import { setUserEmpty } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useLogout = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const callback = async () => await axiosInstance.post(`/logout`)

	const {
		mutate: logout,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['logoutUser'],
		onSuccess: () => dispatch(setUserEmpty()),
		onError: (e) => console.log(e),
	})

	return { logout, isLoading, error, isError }
}

export default useLogout
