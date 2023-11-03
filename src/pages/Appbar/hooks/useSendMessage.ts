import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useSendMessage = () => {
	const { axiosInstance } = useContext(AxiosContext)

	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async (data: any) =>
		await axiosInstance.post('/messages', { data: { ...data, from: connectedUser?.id } })

	const {
		mutate: sendMessage,
		isLoading,
		error,
		isError,
	} = useMutation(['sendMessages'], callback, {
		onSuccess: () => {},
		onError: () => {},
	})

	return { sendMessage, isLoading, error, isError }
}

export default useSendMessage
