import axios from 'axios'
import { Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : ''

const HEADERS = {
	'Content-Type': 'application/json',
	'X-Request-Id': uuidv4(),
	Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_MAPS_BEARER}`,
}

interface FetchProps<T> {
	data?: T
	endpoint: string
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	params?: any
	queries?: any
	filters?: any
}

export const fetchItemsNoDispatch = async ({
	data,
	endpoint,
	method,
	params,
	queries,
	filters,
}: FetchProps<any>): Promise<any> => {
	const aditionalParams = params ? `/${new URLSearchParams({ ...params })}` : ''
	const aditionalQueries = queries ? `?${getQueryString(queries)}` : ''
	const FULL_ROUTE = `${BASE_URL}/${endpoint}${aditionalParams}${aditionalQueries}`

	return baseFetch(FULL_ROUTE, method, data)
}

export const fetchItems =
	({ data, endpoint, method, params, queries, filters }: FetchProps<any>) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		const aditionalParams = params ? `/${new URLSearchParams({ ...params })}` : ''
		const aditionalQueries = queries ? `?${getQueryString(queries)}` : ''
		const FULL_ROUTE = `${BASE_URL}/${endpoint}${aditionalParams}${aditionalQueries}`

		return baseFetch(FULL_ROUTE, method, data)
	}

export const baseFetch = async (FULL_ROUTE, method, data) => {
	return await fetch(FULL_ROUTE, {
		method,
		headers: HEADERS,
		body: JSON.stringify(data),
	}).then((response) => response.json())
}

const getQueryString = (queries: any) => {
	return Object.keys(queries)
		.reduce((result: any, key) => {
			return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
		}, [])
		.join('&')
}

export default axios.create({
	baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'X-Request-Id': uuidv4(),
		Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_MAPS_BEARER}`,
	},
	withCredentials: true,
})
