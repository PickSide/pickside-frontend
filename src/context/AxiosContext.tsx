import { FC, createContext, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'

import { version as ClientVersion } from 'package.json'
import { v4 as uuidv4 } from 'uuid'

export interface AxiosContextProps {
	axiosInstance: AxiosInstance
	axiosFSInstance: AxiosInstance
	axiosNSInstance: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps>({
	axiosInstance: axios,
	axiosFSInstance: axios,
	axiosNSInstance: axios
})

export const AxiosProvider: FC<any> = ({ children }) => {
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_MAIN_SERVICE_URL,
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

	const axiosNSInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_NOTIFICATION_SERVICE_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	useEffect(() => {
		[axiosInstance, axiosFSInstance, axiosNSInstance]
			.forEach((axiosInstance) => axiosInstance.interceptors.request.use((config) => {
				config.headers['Accept'] = '*/*'
				config.headers['Accept-Version'] = 'v2'
				config.headers['X-Client-Version'] = ClientVersion
				config.headers['X-Request-Id'] = uuidv4()
				return config
			},
				(error) => {
					return Promise.reject(error);
				}))
	}, [axiosInstance, axiosFSInstance, axiosNSInstance])

	return <AxiosContext.Provider value={{ axiosInstance, axiosFSInstance, axiosNSInstance }}>{children}</AxiosContext.Provider>
}

export default AxiosContext
