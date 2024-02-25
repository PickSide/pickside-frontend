import { Activity, AppState } from '@state'

import { UseMutateFunction } from '@tanstack/react-query'
import { useMemo } from 'react'
import useRegisterToActivity from './services/useRegisterToActivity'
import { useSelector } from 'react-redux'
import useUpdateFavorite from './services/useUpdateFavorite'

interface ActivityHandlersOutput {
	isFavorite: boolean
	isFull: boolean
	isOrganizer: boolean
	isRegistering: boolean
	isRegisteredToActivity: boolean
	isSavingToFavorite: boolean
	registerToActivity: UseMutateFunction<any, any, unknown, any>
	updateFavorite: UseMutateFunction<any, any, unknown, any>
	registeredCount: number
}
const useActivityHandlers = (activity: Activity): ActivityHandlersOutput => {
	const { registerToActivity, isLoading: isRegistering } = useRegisterToActivity()
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
	const isRegisteredToActivity = useMemo(() => activity.participants?.some((participant) => participant.id === me?.id), [activity.participants, me])
	const registeredCount = useMemo(() => activity.participants?.length || 0, [activity.participants])

	return {
		isFavorite,
		isFull,
		isOrganizer,
		isRegistering,
		isSavingToFavorite,
		isRegisteredToActivity,
		registerToActivity,
		updateFavorite,
		registeredCount,
	}
}

export default useActivityHandlers
