import { Activity, AppState } from '@state'

import { UseMutateFunction } from '@tanstack/react-query'
import { useMemo } from 'react'
import useRegisterSelfToActivity from './services/useRegisterSelfToActivity'
import { useSelector } from 'react-redux'
import useUnregisterSelfToActivity from './services/useUnregisterSelfFromActivity'
import useUpdateFavorite from './services/useUpdateFavorite'

interface ActivityHandlersOutput {
	isFavorite: boolean
	isFull: boolean
	isOrganizer: boolean
	isRegistering: boolean
	isUnregistering: boolean
	isRegisteredToActivity: boolean
	isSavingToFavorite: boolean
	registerToActivity: UseMutateFunction<any, any, unknown, any>
	unregisterFromActivity: UseMutateFunction<any, any, unknown, any>
	updateFavorite: UseMutateFunction<any, any, unknown, any>
}
const useActivityHandlers = (activity: Activity): ActivityHandlersOutput => {
	const { registerToActivity, isLoading: isRegistering } = useRegisterSelfToActivity()
	const { unregisterFromActivity, isLoading: isUnregistering } = useUnregisterSelfToActivity()
	const { updateFavorite, isLoading: isSavingToFavorite } = useUpdateFavorite()

	const me = useSelector((state: AppState) => state.user)
	const isFavorite = useMemo(() => {
		if (!activity.id || !me || !me?.favorites) return false
		return me.favorites.some((fav) => fav === activity.id)
	}, [activity.id, me])
	const isFull = useMemo(() => activity.participants?.length === activity.maxPlayers, [activity])
	const isOrganizer = useMemo(() => activity.organizer?.id === me?.id, [activity, me])
	const isRegisteredToActivity = useMemo(
		() => activity.participants?.some((participant) => participant?.id === me?.id),
		[activity.participants, me],
	)

	return {
		isFavorite,
		isFull,
		isOrganizer,
		isRegistering,
		isUnregistering,
		isSavingToFavorite,
		isRegisteredToActivity,
		registerToActivity,
		unregisterFromActivity,
		updateFavorite,
	}
}

export default useActivityHandlers
