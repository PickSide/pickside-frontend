import { AppState } from '@state'
import { AxiosContext } from '@context'
import { handleResponseError } from '@utils'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useFetchConflictingEvents = () => {
	const { extsvcInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async ({ date, endTime, startTime }) =>
		await extsvcInstance.get(`/activities/conflicting`, {
			params: { date, endTime, startTime, userKey: me?.id },
		})

	const {
		mutate: fetchConflictingEvents,
		isLoading,
		error,
		isError,
	} = useMutation(callback, {
		mutationKey: ['fetch-conflicting-event'],
		onError: (e: any) => handleResponseError(e),
	})

	return { fetchConflictingEvents, isLoading, error, isError }
}

export default useFetchConflictingEvents
