import { FC, createContext } from 'react'
import axios, { AxiosInstance } from 'axios'

import { v4 as uuidv4 } from 'uuid'

export interface AxiosContextProps {
	axiosInstance: AxiosInstance
	axiosISInstance: AxiosInstance
}

const AxiosContext = createContext<AxiosContextProps>({
	axiosInstance: axios,
	axiosISInstance: axios
})

export const AxiosProvider: FC<any> = ({ children }) => {
	const axiosInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_API_URL_V2,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			'X-Request-Id': uuidv4(),
		},
	})

	const axiosISInstance = axios.create({
		baseURL: import.meta.env.VITE_APP_IS_URL,
		withCredentials: true,
		headers: {
			'X-Request-Id': uuidv4(),
		},
	})

	return <AxiosContext.Provider value={{ axiosInstance, axiosISInstance }}>{children}</AxiosContext.Provider>
}

export default AxiosContext
