import { Activity, AppState } from '@state'

import { UseMutateFunction } from '@tanstack/react-query'
import useDeleteActivity from './services/useDeleteActivity'
import { useMemo } from 'react'
import useRegisterToActivity from './services/useRegisterToActivity'
import { useSelector } from 'react-redux'

interface ActivityHandlersOutput {
	isFull: boolean
	isOrganizer: boolean
	isDeletingActivity: boolean
	isRegistering: boolean
	isRegisteredToActivity: boolean
	registeredCount: number
	deleteActivity: UseMutateFunction<any, unknown, string, unknown>
	registerToActivity: UseMutateFunction<any, any, unknown, any>
}
const useActivityHandlers = (activity: Activity): ActivityHandlersOutput => {
	const { registerToActivity, isLoading: isRegistering } = useRegisterToActivity()
	const { deleteActivity, isLoading: isDeletingActivity } = useDeleteActivity()

	const me = useSelector((state: AppState) => state.user)
	const isFull = useMemo(() => activity.participants?.length === activity.maxPlayers, [activity])
	const isOrganizer = useMemo(() => activity.organizer?.id === me?.id, [activity, me])
	const isRegisteredToActivity = useMemo(
		() => activity.participants?.some((participant) => participant.id === me?.id),
		[activity.participants, me],
	)
	const registeredCount = useMemo(() => activity.participants?.length || 0, [activity.participants])

	return {
		isFull,
		isOrganizer,
		isDeletingActivity,
		isRegistering,
		isRegisteredToActivity,
		deleteActivity,
		registerToActivity,
		registeredCount,
	}
}

export default useActivityHandlers
