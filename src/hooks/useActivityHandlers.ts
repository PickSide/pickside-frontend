import { Activity, AppState } from '@state'

import { UseMutateFunction } from '@tanstack/react-query'
import useDeleteActivity from './services/useDeleteActivity'
import { useMemo } from 'react'
import useRegisterToActivity from './services/useRegisterToActivity'
import { useSelector } from 'react-redux'
import useUpdateFavorite from './services/useUpdateFavorite'

interface ActivityHandlersOutput {
	isFavorite: boolean
	isFull: boolean
	isOrganizer: boolean
	isDeletingActivity: boolean
	isRegistering: boolean
	isRegisteredToActivity: boolean
	isSavingToFavorite: boolean
	registeredCount: number
	deleteActivity: UseMutateFunction<any, unknown, string, unknown>
	updateFavorite: UseMutateFunction<any, any, unknown, any>
	registerToActivity: UseMutateFunction<any, any, unknown, any>
}
const useActivityHandlers = (activity: Activity): ActivityHandlersOutput => {
	const { registerToActivity, isLoading: isRegistering } = useRegisterToActivity()
	const { deleteActivity, isLoading: isDeletingActivity } = useDeleteActivity()
	const { updateFavorite, isLoading: isSavingToFavorite } = useUpdateFavorite()

	const me = useSelector((state: AppState) => state.user)
	const isFavorite = useMemo(() => {
		if (!activity.id || !me || !me?.favorites) {
			return false
		}
		return me.favorites.split(',').some((fav) => fav == activity.id)
	}, [activity.id, me])
	const isFull = useMemo(() => activity.participants?.length === activity.maxPlayers, [activity])
	const isOrganizer = useMemo(() => activity.organizer?.id === me?.id, [activity, me])
	const isRegisteredToActivity = useMemo(
		() => activity.participants?.some((participant) => participant.id === me?.id),
		[activity.participants, me],
	)
	const registeredCount = useMemo(() => activity.participants?.length || 0, [activity.participants])

	return {
		isFavorite,
		isFull,
		isOrganizer,
		isDeletingActivity,
		isRegistering,
		isSavingToFavorite,
		isRegisteredToActivity,
		deleteActivity,
		registerToActivity,
		updateFavorite,
		registeredCount,
	}
}

export default useActivityHandlers
