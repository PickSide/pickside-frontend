import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchServicesHealth = () => {
	const { axiosMSInstance, axiosFSInstance, axiosNSInstance } = useContext(AxiosContext)

	const fetchServicesHealth = async () => {
		const promiseHandler = (promise, serviceName: string) => {
			return promise
				.then((response) => ({ name: serviceName, success: true, response }))
				.catch((error) => ({ name: serviceName, success: false, error }))
		}

		const responses = await Promise.all([
			promiseHandler(axiosMSInstance.get('/health'), 'main-service'),
			promiseHandler(axiosFSInstance.get('/health'), 'file-service'),
			promiseHandler(axiosNSInstance.get('/health'), 'notification-service'),
		])

		return responses
	}

	const {
		data: responses,
		isLoading,
		error: reqError,
		refetch,
	} = useQuery(['fetch-health-services'], fetchServicesHealth, {
		onError: () => {},
		refetchInterval: 3.6e6,
		refetchOnWindowFocus: false,
	})

	const services = responses?.map(({ name, success, response }, idx) => ({ name: name, isServiceON: success }))

	const isAtLeastOneErrored = services?.some((s) => !s.isServiceON)

	return { services, isLoading, reqError, isAtLeastOneErrored, refetch }
}

export default useFetchServicesHealth
