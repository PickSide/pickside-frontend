import { AxiosContext } from '@context'
import { updateActivity } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

const useCreateActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const dispatch = useDispatch()

	const callback = async (data: any) => await axiosInstance.post(`/activities`, { data })

	const {
		mutate: createActivity,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['createActivity'],
		onSuccess: (data) => dispatch<any>(updateActivity(data?.data)),
		onError: (e) => console.log(e),
	})

	return { createActivity, isLoading, error, isError }
}

export default useCreateActivity
