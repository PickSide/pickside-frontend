import { AxiosContext } from '@context'
import { setLocales } from '@state'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

const useFetchLocales = () => {
	const dispatch = useDispatch()
	const { axiosMSInstance } = useContext(AxiosContext)

	const callback = async () => await axiosMSInstance.get('/locales')

	const { data: locales, isLoading } = useQuery(['fetch-locales'], callback, {
		onSuccess: ({ data }) => dispatch(setLocales(data)),
		onError: () => {},
		refetchOnWindowFocus: false,
	})

	return { locales, isLoading }
}

export default useFetchLocales
