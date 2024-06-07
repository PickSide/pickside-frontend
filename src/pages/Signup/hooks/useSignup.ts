import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { setMe } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const useSignup = () => {
	const { axiosMSInstance, setBearer } = useContext(AxiosContext)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const callback = async (data: any) => await axiosMSInstance.post(`/signup`, data)

	const {
		mutate: signup,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['create-user'],
		onSuccess: ({ data }) => {
			setBearer(data.result.token)
			dispatch(setMe(data.result.user))
			navigate('/', { replace: true })
		},
		onError: (error: any) => handleResponseError(error),
	})

	return { signup, isLoading, error, isError }
}

export default useSignup
