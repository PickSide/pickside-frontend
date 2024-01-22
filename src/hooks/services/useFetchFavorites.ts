import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useFetchActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const me = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.get(`/activities/user/${me?.id}/favorites`)

	const { data: favorites, isLoading } = useQuery(['fetch-favorites'], callback, {
		refetchOnWindowFocus: false,
	})

	return { favorites, isLoading }
}

export default useFetchActivity
