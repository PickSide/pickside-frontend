import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchFavorites = () => {
	const { axiosMSInstance } = useContext(AxiosContext)

	const callback = async () => await axiosMSInstance.get(`/me/activities/favorites`)

	const { data: favorites, isLoading } = useQuery(['fetch-favorites'], callback, {
		refetchOnWindowFocus: false,
	})

	return { favorites, isLoading }
}

export default useFetchFavorites
