import { AxiosContext } from '@context'
import { updateActivity } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useCreateUser = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const callback = async (data: any) => await axiosInstance.post(`/users`, { data })

	const {
		mutate: createUser,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createUser'],
		onSuccess: (data) => dispatch<any>(updateActivity(data?.data)),
		onError: (e) => console.log(e),
	})

	return { createUser, isLoading, error, isError }
}

export default useCreateUser
