import { Dispatch, FC, SetStateAction, createContext, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'

import { version as ClientVersion } from 'package.json'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidv4 } from 'uuid'

export interface AxiosContextProps {
	axiosASInstance: AxiosInstance
	axiosFSInstance: AxiosInstance
	axiosMSInstance: AxiosInstance
	axiosNSInstance: AxiosInstance
	setBearer: Dispatch<SetStateAction<string | null>>
}

const AxiosContext = createContext<AxiosContextProps>({
	axiosASInstance: axios,
	axiosFSInstance: axios,
	axiosMSInstance: axios,
	axiosNSInstance: axios,
	setBearer: () => null,
})

export const AxiosProvider: FC<any> = ({ children }) => {
	const axiosASInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_AUTH_SERVICE_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const axiosFSInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_FILE_SERVICE_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
		},
	})

	const axiosMSInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_MAIN_SERVICE_URL,
		withCredentials: true,
		headers: {
			'Accept-Version': 'v2',
			'Content-Type': 'application/json',
		},
	})

	const axiosNSInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_NOTIFICATION_SERVICE_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const [bearer, setBearer] = useLocalStorage<string | null>('my-bearer-token', null)

	useEffect(() => {
		const instances = [axiosMSInstance]
		const interceptorIDs = new Map<AxiosInstance, number>()

		const addInterceptor = (axiosInstance: AxiosInstance) => {
			const id = axiosInstance.interceptors.request.use(async (config) => {
				try {
					await axiosASInstance.get('/verify-token', {
						headers: {
							Authorization: `Bearer ${bearer || ''}`,
						},
					})

					config.headers['Accept'] = '*/*'
					config.headers['Accept-Version'] = 'v2'
					config.headers['X-Client-Version'] = ClientVersion
					config.headers['X-Request-Id'] = uuidv4()

					return config
				} catch (error) {
					throw error
				}
			})

			interceptorIDs.set(axiosInstance, id)
		}

		instances.forEach(addInterceptor)

		return () => {
			instances.forEach((instance) => {
				const id = interceptorIDs.get(instance)
				if (id !== undefined) {
					instance.interceptors.request.eject(id)
				}
			})
		}
	}, [axiosASInstance, axiosFSInstance, axiosMSInstance, axiosNSInstance, bearer])

	return (
		<AxiosContext.Provider value={{ axiosASInstance, axiosFSInstance, axiosMSInstance, axiosNSInstance, setBearer }}>
			{children}
		</AxiosContext.Provider>
	)
}

export default AxiosContext
