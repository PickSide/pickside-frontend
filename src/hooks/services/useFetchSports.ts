import { AxiosContext } from '@context'
import { setSports } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchSports = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async () => await axiosInstance.get('/sports')

	const { data: sports, isLoading } = useQuery(['fetchSports'], callback, {
		onSuccess: ({ data }) => dispatch<any>(setSports(data)),
		onError: () => {},
	})

	return { sports, isLoading }
}

export default useFetchSports
