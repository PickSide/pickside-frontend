import { FC, createContext, useEffect, useMemo } from 'react'
import axios, { AxiosInstance } from 'axios'

import { useLocalStorage } from 'react-use'
import { v4 as uuidv4 } from 'uuid'

export interface AxiosContextProps {
	axiosInstance: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps>({
	axiosInstance: axios,
})

export const AxiosProvider: FC<any> = ({ children }) => {
	const [cachedAccessToken] = useLocalStorage<{ accessToken?: string }>('accessToken')

	const axiosInstance = useMemo(
		() =>
			axios.create({
				baseURL: import.meta.env.VITE_APP_API_URL,
				headers: {
					'Content-Type': 'application/json',
					'X-Request-Id': uuidv4(),
					Authorization: `Bearer ${cachedAccessToken}`,
				},
			}),
		[cachedAccessToken],
	)

	useEffect(() => {
		const accessToken = cachedAccessToken?.accessToken
		const requestIntercept = axiosInstance.interceptors.request.use(
			(config) => {
				if (config.headers && !config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error),
		)

		const responseIntercept = axiosInstance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true
					const newAccessToken = await axiosInstance.get('/token').then((response) => response.data)
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
					return axios(prevRequest)
				}
				return Promise.reject(error)
			},
		)

		return () => {
			axiosInstance.interceptors.request.eject(requestIntercept)
			axiosInstance.interceptors.response.eject(responseIntercept)
		}
	}, [axiosInstance, cachedAccessToken])

	return <AxiosContext.Provider value={{ axiosInstance }}>{children}</AxiosContext.Provider>
}

export default AxiosContext
