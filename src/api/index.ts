import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''
export const BASE_AUTH_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : ''

const HEADERS = {
	'Content-Type': 'application/json',
	'X-Request-Id': uuidv4(),
	Authorization: `Bearer ${window.localStorage.getItem('auth.accessToken')}`,
}

const AUTH_HEADERS = {
	'Content-Type': 'application/json',
	'X-Request-Id': uuidv4(),
}

interface RequestProps<T> {
	id?: string
	baseUrl?: string
	data?: T
	endpoint: string
	method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'
	params?: any
	queries?: any
	filters?: any
	secure?: boolean
}

export const lazyFetch = async ({ baseUrl, endpoint, id, secure = true, method = 'GET' }: RequestProps<any>): Promise<any> => {
	const url = Url(baseUrl, endpoint, id)
	return await axiosInstance(secure).get(url)
}

export const fetchItem =
	({ baseUrl, endpoint, id, secure = true }: RequestProps<any>) =>
		async (dispatch: Dispatch): Promise<any> => {
			const url = Url(baseUrl, endpoint, id)
			return await axiosInstance(secure)
				.get(url)
				.then((response) => response.data)
		}

export const fetchItems =
	({ baseUrl, endpoint, id, params, queries, secure = true }: RequestProps<any>) =>
		async (dispatch: Dispatch): Promise<any> => {
			const url = Url(baseUrl, endpoint, id, params, queries)
			return await axiosInstance(secure)
				.get(url)
				.then((response) => response.data)
		}

export const updateItem =
	({ baseUrl, endpoint, id, data, secure = true }: RequestProps<any>) =>
		async (dispatch: Dispatch): Promise<any> => {
			const url = Url(baseUrl, endpoint, id)
			return await axiosInstance(secure).put(url, { data })
		}

export const createItem =
	({ baseUrl, endpoint, id, data, secure = true }: RequestProps<any>) =>
		async (dispatch: Dispatch): Promise<any> => {
			const url = Url(baseUrl, endpoint, id)
			return await axiosInstance(secure)
				.post(url, { data })
				.then((response) => response.data)
		}

export const login =
	(data: any) =>
		async (dispatch: Dispatch): Promise<any> => {
			return await axiosAuth
				.post('/login', { data })
				.then((response) => response.data)
		}

export const logout =
	(data: any) =>
		async (dispatch: Dispatch): Promise<any> => {
			return await axiosAuth
				.post('/logout')
				.then((response) => response.data)
		}
function axiosInstance(secure: boolean = false) {
	if (secure) {
		return axiosPrivate
	}
	return axiosNonSecure
}

function Url(baseUrl, endpoint, id?, params?, queries?) {
	const url = `${endpoint}${id ? `/${id}` : ''}${params ? `/${new URLSearchParams({ ...params })}` : ''}${queries ? `?${getQueryString(queries)}` : ''}`
	return url
}

function getQueryString(queries: any) {
	return Object.keys(queries)
		.reduce((result: any, key) => {
			return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
		}, [])
		.join('&')
}

export const axiosNonSecure = axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: HEADERS,
	withCredentials: true,
})

export const axiosAuth = axios.create({
	baseURL: BASE_AUTH_URL,
	headers: AUTH_HEADERS,
})

function handleStatusCodeReturn({ }) { }
