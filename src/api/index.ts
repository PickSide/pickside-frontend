import { Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''
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

export const fetchItems =
	({ data, endpoint, method, params, queries, filters }: FetchProps<any>) =>
	async (dispatch: Dispatch<any>): Promise<any> => {
		const aditionalParams = params ? `/${new URLSearchParams({ ...params })}` : ''
		const aditionalQueries = queries ? `?${getQueryString(queries)}` : ''
		const FULL_ROUTE = `${BASE_URL}/${endpoint}${aditionalParams}${aditionalQueries}`

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
