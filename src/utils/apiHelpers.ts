import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

interface RequestProps<T> {
    id?: string
    baseUrl?: string
    data?: T
    endpoint: string
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH'
    params?: any
    queries?: any
    filters?: any
}

interface UrlProps {
    id?: string | number
    endpoint?: string
    params?: any
    queries?: any
}

interface UseCallsProps {
    baseURL?: string
    secureEachRequest?: boolean
}
const accessToken = window.localStorage.getItem('auth.accessToken')

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': uuidv4(),
        Authorization: `Bearer ${window.localStorage.getItem('auth.accessToken')}`,
    },
})

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

axiosInstance.interceptors.request.eject(requestIntercept)
axiosInstance.interceptors.response.eject(responseIntercept)

const lazyGetItem = async ({ endpoint, id }: RequestProps<any>) => {
    const url = Url({ endpoint, id })
    return await axiosInstance
        .get(url)
        .then((response) => response.data)
        .catch((error) => handleResponseError(error))
}

const lazyGetItems = async ({ endpoint, id }: RequestProps<any>) => {
    const url = Url({ endpoint, id })
    return await axiosInstance
        .get(url)
        .then((response) => response.data)
        .catch((error) => handleResponseError(error))
}

const getItem = ({ endpoint, id }: RequestProps<any>) => async (dispatch) => {
    const url = Url({ endpoint, id })
    return await axiosInstance
        .get(url)
        .then((response) => response.data)
        .catch((error) => handleResponseError(error))
}

const getItems = ({ endpoint, id }: RequestProps<any>) => async (dispatch) => {
    const url = Url({ endpoint, id })
    return await axiosInstance
        .get(url)
        .then((response) => response.data)
        .catch((error) => handleResponseError(error))
}

const postItem = ({ endpoint, data, id }: RequestProps<any>) => async (dispatch) => {
    const url = Url({ endpoint, id })
    return await axiosInstance
        .post(url, { data })
        .then((response) => response.data)
        .catch((error) => handleResponseError(error))
}

const postItems = ({ endpoint, params, queries }: RequestProps<any>) => async (dispatch) => { }

const putItem = ({ endpoint, id, data }: RequestProps<any>) => async (dispatch) => {
    const url = Url({ endpoint, id })
    return await axiosInstance.put(url, { data })
}

const putItems = ({ endpoint, params, queries }: RequestProps<any>) => async (dispatch) => { }

const deleteItem = ({ endpoint, id, params, queries }: RequestProps<any>) => async (dispatch) => { }

const deleteItems = ({ endpoint, params, queries }: RequestProps<any>) => async (dispatch) => { }

function handleResponseError(axiosError: any) {
    return { error: axiosError.response.data.message }
}

function Url({ endpoint, id, params, queries }: UrlProps) {
    const url = `${endpoint}${id ? `/${id}` : ''}${params ? `/${new URLSearchParams({ ...params })}` : ''}${queries ? `?${getQueryString(queries)}` : ''
        }`
    return url
}

function getQueryString(queries: any) {
    return Object.keys(queries)
        .reduce((result: any, key) => {
            return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
        }, [])
        .join('&')
}

export {
    deleteItem,
    deleteItems,
    getItem,
    getItems,
    lazyGetItem,
    lazyGetItems,
    postItem,
    postItems,
    putItem,
    putItems,
}
