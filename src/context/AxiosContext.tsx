import { FC, createContext } from 'react'
import axios, { AxiosInstance } from 'axios'

import { v4 as uuidv4 } from 'uuid'

export interface AxiosContextProps {
	axiosInstance: AxiosInstance
	axiosFSInstance: AxiosInstance
	axiosNSInstance: AxiosInstance
	axiosWSInstance: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps>({
	axiosInstance: axios,
	axiosFSInstance: axios,
	axiosNSInstance: axios,
	axiosWSInstance: axios
})

export const AxiosProvider: FC<any> = ({ children }) => {
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_MAIN_SERVICE_URL,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			'X-Request-Id': uuidv4(),
		},
	})

	const axiosFSInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_FILE_SERVICE_URL,
		withCredentials: true,
		headers: {
			'X-Request-Id': uuidv4(),
		},
	})

	const axiosNSInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_NOTIFICATION_SERVICE_URL,
		withCredentials: true,
		headers: {
			'X-Request-Id': uuidv4(),
		},
	})

	return <AxiosContext.Provider value={{ axiosInstance, axiosFSInstance, axiosNSInstance, axiosWSInstance }}>{children}</AxiosContext.Provider>
}

export default AxiosContext
