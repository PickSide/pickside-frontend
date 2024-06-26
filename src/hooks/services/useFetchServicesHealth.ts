import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

const useFetchServicesHealth = () => {
	const { axiosASInstance, axiosFSInstance, extsvcInstance, axiosMSGSInstance, axiosNSInstance } =
		useContext(AxiosContext)

	const fetchServicesHealth = async () => {
		const promiseHandler = (promise, serviceName: string) => {
			return promise
				.then((response) => ({ name: serviceName, success: true, response }))
				.catch((error) => ({ name: serviceName, success: false, error }))
		}

		const responses = await Promise.all([
			promiseHandler(axiosASInstance.get('/health'), 'Authentication service'),
			promiseHandler(axiosFSInstance.get('/health'), 'File service'),
			promiseHandler(extsvcInstance.get('/health'), 'External gateway service'),
			promiseHandler(axiosMSGSInstance.get('/health'), 'Message service'),
			promiseHandler(axiosNSInstance.get('/health'), 'Notification service'),
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
