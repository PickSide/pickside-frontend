import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useFetchActivity = () => {
	const { axiosInstance } = useContext(AxiosContext)
	const connectedUser = useSelector((state: AppState) => state.user)

	const callback = async () => await axiosInstance.get(`/activities/user/${connectedUser?.id}/favorites`)

	const { data: favorites, isLoading } = useQuery(['fetchUserFavorites'], callback, {
		refetchOnWindowFocus: false,
	})

	return { favorites, isLoading }
}

export default useFetchActivity
