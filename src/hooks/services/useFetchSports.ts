import { AxiosContext } from '@context'
import { setSports } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchSports = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async () => await axiosInstance.get('/sports')

	const { data: sports, isLoading } = useQuery(['fetch-sports'], callback, {
		onSuccess: ({ data }) => {

			dispatch(setSports(data))
		},
		onError: () => { },
		refetchOnWindowFocus: false,
	})

	return { sports, isLoading }
}

export default useFetchSports
