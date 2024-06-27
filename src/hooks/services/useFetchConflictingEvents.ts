import { AppState } from '@state'
import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useFetchConflictingEvents = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async ({ date, endTime, startTime }: any) =>
		await extsvcInstance.get(`/activities/conflicting`, {
			params: { date, endTime, startTime, userKey: me?.id },
		})

	const {
		data: conflictingEvents,
		isLoading,
		error,
		isError,
		refetch,
	} = useQuery(['fetch-conflicting-event'], (params) => callback(params), {
		onError: (e: any) => handleResponseError(e),
		enabled: false,
	})

	return { conflictingEvents, isLoading, error, isError, refetch }
}

export default useFetchConflictingEvents
