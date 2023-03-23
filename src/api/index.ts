import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''

const HEADERS = {
	'Content-Type': 'application/json',
	'X-Request-Id': uuidv4(),
	Authorization: `Bearer ${window.localStorage.getItem('auth.accessToken')}`,
}

interface RequestProps<T> {
	id?: string
	data?: T
	endpoint: string
	params?: any
	queries?: any
	filters?: any
	secure?: boolean
}
export const lazyFetch = async ({ endpoint, id, secure = true }: RequestProps<any>): Promise<any> => {
	const url = Url(endpoint, id)
	return await axiosInstance(secure).get(url)
}

export const fetchItem =
	({ endpoint, id, secure = true }: RequestProps<any>) =>
	async (dispatch: Dispatch): Promise<any> => {
		const url = Url(endpoint, id)
		return await axiosInstance(secure)
			.get(url)
			.then((response) => response.data)
	}

export const fetchItems =
	({ endpoint, id, params, queries, secure = true }: RequestProps<any>) =>
	async (dispatch: Dispatch): Promise<any> => {
		const url = Url(endpoint, id, params, queries)
		return await axiosInstance(secure)
			.get(url)
			.then((response) => response.data)
	}

export const updateItem =
	({ endpoint, id, data, secure = true }: RequestProps<any>) =>
	async (dispatch: Dispatch): Promise<any> => {
		const url = Url(endpoint, id)
		return await axiosInstance(secure).put(url, { data })
	}

export const createItem =
	({ endpoint, id, data, secure = true }: RequestProps<any>) =>
	async (dispatch: Dispatch): Promise<any> => {
		const url = Url(endpoint, id)
		return await axiosInstance(secure)
			.post(url, { data })
			.then((response) => response.data)
	}

function axiosInstance(secure: boolean) {
	if (secure) {
		return axiosPrivate
	}
	return axiosNonSecure
}

function Url(endpoint, id?, params?, queries?) {
	const endpointId = id ? `/${id}` : ''
	const aditionalParams = params ? `/${new URLSearchParams({ ...params })}` : ''
	const aditionalQueries = queries ? `?${getQueryString(queries)}` : ''

	return `/${endpoint}${endpointId}${aditionalParams}${aditionalQueries}`
}
function getQueryString(queries: any) {
	return Object.keys(queries)
		.reduce((result: any, key) => {
			return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
		}, [])
		.join('&')
}

function handleStatusCodeReturn({}) {}

export default axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
})

export const axiosNonSecure = axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
	withCredentials: true,
})
