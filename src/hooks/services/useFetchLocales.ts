import { AxiosContext } from '@context'
import { setLocales } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchLocales = () => {
	const dispatch = useDispatch()
	const { axiosInstance } = useContext(AxiosContext)

	const callback = async () => await axiosInstance.get('/locales')

	const { data: locales, isLoading } = useQuery(['fetchLocales'], callback, {
		onSuccess: ({ data }) => dispatch(setLocales(data)),
		onError: () => {},
	})

	return { locales, isLoading }
}

export default useFetchLocales
