import { useEffect, useMemo, useState } from 'react'

import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'
import { useLocalStorage } from 'react-use'
import { v4 as uuidv4 } from 'uuid'

enum JobType {
	Login = 'login',
	Logout = 'logout',
	Register = 'register',
	GetAccessToken = 'getaccesstoken',
	GetCourt = 'getcourt',
	UpdateUser = 'updateuser',
	GetCustomCourts = 'getcustomcourts',
	GetCustomCourt = 'getcustomcourt',
	AddCutomCourt = 'addcustomcourt',
	DeleteCustomCourt = 'deletecustomcourt',
	VerifyEmail = 'vertifyemail',
	DeactivateAccount = 'deactivateaccount',
	ReactivateAccount = 'deactivateaccount',
}

enum FailReason {
	TokenExpired = 'tokenexpired',
	TokenError = 'tokenerror',
	UserDeactivateAccount = 'userdeactivateaccount',
	UserReactivateAccount = 'userreactivateaccount',
	UserInactive = 'userinactive',
	UserExists = 'userexists',
	UserFailedToUpdate = 'userfailtoupdate',
	UserWrongCredentials = 'userbadcredentials',
	UserLogout = 'userlogout',
}

interface RequestProps<T> {
	id?: string
	baseUrl?: string
	data?: T
	extra?: string
	endpoint: string
	method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'
	params?: any
	queries?: any
	filters?: any
}

interface UrlProps {
	id?: string | number
	endpoint?: string
	extra?: string
	params?: any
	queries?: any
}

interface UseCallsOutput {
	apiErrors: string[]
	lazyGetItem: (r: RequestProps<any>) => Promise<any>
	lazyGetItems: (r: RequestProps<any>) => Promise<any>
	getCustom: (r) => Promise<any>
	getItem: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	getItems: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	postItem: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	postItems?: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	putItem: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	putItems?: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	deleteItem?: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
	deleteItems?: (r: RequestProps<any>) => (d: Dispatch) => Promise<any>
}

interface ErrorResponse {
	callback?: string
	context?: any
	extra?: any
	failReason?: FailReason
	jobStatus?: 'FAILED' | 'COMPLETED'
	jobType?: JobType
	message?: string
	res: any
	status: any
	timeStamp?: Date
}

const useApiHelpers = (): UseCallsOutput => {
	const [previousCachedTokens] = useLocalStorage<{ accessToken?: string; refreshToken?: string }>('auth')
	const [errors] = useState<any>()

	const axiosInstance = useMemo(
		() =>
			axios.create({
				baseURL: import.meta.env.VITE_APP_API_URL,
				headers: {
					'Content-Type': 'application/json',
					'X-Request-Id': uuidv4(),
					Authorization: `Bearer ${previousCachedTokens?.accessToken}`,
				},
			}),
		[previousCachedTokens],
	)

	const handleResponseError = (axiosError: any): ErrorResponse => ({ ...axiosError.response.data })

	useEffect(() => {
		const accessToken = previousCachedTokens?.accessToken
		const requestIntercept = axios.interceptors.request.use(
			(config) => {
				if (config.headers && !config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error),
		)

		const responseIntercept = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true
					const url = Url({ endpoint: 'token' })
					const newAccessToken = await axiosInstance.get(url).then((response) => response.data)
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
	}, [axiosInstance, previousCachedTokens])

	return {
		apiErrors: errors,
		lazyGetItem: async ({ endpoint, id }) => {
			const url = Url({ endpoint, id })
			return await axiosInstance
				.get(url)
				.then((response) => response.data)
				.catch((error) => handleResponseError(error))
		},
		lazyGetItems: async ({ endpoint, id }) => {
			const url = Url({ endpoint, id })
			return await axiosInstance
				.get(url)
				.then((response) => response.data)
				.catch((error) => handleResponseError(error))
		},
		getCustom: async ({ url, headers, data, params }) => {
			return await axiosInstance
				.get(url, {
					headers,
				})
				.then((response) => response.data)
				.catch((error) => handleResponseError(error))
		},
		getItem:
			({ endpoint, id }) =>
			async (dispatch) => {
				const url = Url({ endpoint, id })
				return await axiosInstance
					.get(url)
					.then((response) => response.data)
					.catch((error) => handleResponseError(error))
			},
		getItems:
			({ endpoint, id }) =>
			async (dispatch) => {
				const url = Url({ endpoint, id })
				return await axiosInstance
					.get(url)
					.then((response) => response.data)
					.catch((error) => handleResponseError(error))
			},
		postItem:
			({ endpoint, data, id }) =>
			async (dispatch) => {
				const url = Url({ endpoint, id })
				return await axiosInstance
					.post(url, { data })
					.then((response) => response.data)
					.catch((error) => handleResponseError(error))
			},
		postItems:
			({ endpoint, params, queries }) =>
			async (dispatch) => {},
		putItem:
			({ endpoint, extra, id, data }) =>
			async (dispatch) => {
				const url = Url({ endpoint, extra, id })
				return await axiosInstance.put(url, { data })
			},
		putItems:
			({ endpoint, params, queries }) =>
			async (dispatch) => {},
		deleteItem:
			({ endpoint, id, params, queries }) =>
			async (dispatch) => {},
		deleteItems:
			({ endpoint, params, queries }) =>
			async (dispatch) => {},
	}
}

function Url({ endpoint, id, extra, params, queries }: UrlProps) {
	const url = `${endpoint}${id ? `/${id}` : ''}${extra ? `/${extra}` : ''}${
		params ? `/${new URLSearchParams({ ...params })}` : ''
	}${queries ? `?${getQueryString(queries)}` : ''}`
	return url
}

function getQueryString(queries: any) {
	return Object.keys(queries)
		.reduce((result: any, key) => {
			return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
		}, [])
		.join('&')
}

export default useApiHelpers
