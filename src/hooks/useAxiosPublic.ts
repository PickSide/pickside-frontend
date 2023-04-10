import { useEffect } from 'react'
import { useLocalStorage, useRefreshToken } from 'hooks'
import { axiosPrivate } from 'api'
import { ACCESS_TOKEN } from 'utils/constants'
import { useAccountContext } from 'context/AccountContext'

const useAxiosPrivate = () => {
	const { get } = useLocalStorage()
	const { user } = useAccountContext()
	const { refresh } = useRefreshToken()

	useEffect(() => {
		const accessToken = get('user.accessToken')
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (config.headers && !config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error),
		)

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true
					const newAccessToken = await refresh()
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
					return axiosPrivate(prevRequest)
				}
				return Promise.reject(error)
			},
		)

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept)
			axiosPrivate.interceptors.response.eject(responseIntercept)
		}
	}, [get, refresh])
}

export default useAxiosPrivate
