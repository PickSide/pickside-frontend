import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'X-Request-Id': uuidv4(),
		Authorization: `Bearer ${window.localStorage.getItem('auth.accessToken')}`,
	},
})

const requestIntercept = axios.interceptors.request.use(
	(config) => {
		if (config.headers && !config.headers['Authorization']) {
			config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('auth.accessToken')}`
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
			const newAccessToken = await axiosInstance.get('/token').then((response) => response.data)
			prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
			return axios(prevRequest)
		}
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.request.eject(requestIntercept)
axiosInstance.interceptors.response.eject(responseIntercept)

export const fetchGoogleAccountInfoServiceAPI = (accessToken: string) =>
	axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: 'application/json',
		},
	})

export const deactivate = (id: string) => axiosInstance.get(`/users/deactivate/${id}`)
export const reactivate = (id: string) => axiosInstance.put(`/users/deactivate/${id}`)
export const refreshToken = () => axiosInstance.get('/token')
export const loginUser = (data: any) => axiosInstance.post('/login', { data })
export const loginUserWithGoogle = (data: any) => axiosInstance.post('/googlelogin', { data })
export const logoutUser = (data: any) => axiosInstance.post('/logout', { data })
export const resetDb = () => axiosInstance.post('/resetdb')

export const fetchActivities = () => axiosInstance.get(`/activities`)
export const fetchActivity = (activityId: string) => axiosInstance.get(`/activities/${activityId}`)
export const createActivity = (data: any) => axiosInstance.post(`/activities`, { data })
export const registerSelfToActivity = (activityId: string, userId: string) =>
	axiosInstance.put(`/activities/register/${activityId}`, { userId })
export const unregisterSelfFromActivity = (activityId: string, userId: string) =>
	axiosInstance.put(`/activities/unregister/${activityId}`, { userId })
export const updateFavorite = (activityId: string, userId: string) =>
	axiosInstance.put('/activities/favorites', { userId })

export const fetchLocales = () => axiosInstance.get(`/locales`)

export const getNotifications = (userId: string) => axiosInstance.get(`/notifications/${userId}`)
export const markNotificationAsRead = (notificationId: string, userId: string) =>
	axiosInstance.put(`/notifications/${notificationId}/${userId}`)

export const fetchUsers = () => axiosInstance.get(`/locales`)
export const fetchUserById = (userId: any) => axiosInstance.get(`/locales`)
export const fetchUsersByGroupId = (groupId: any) => axiosInstance.get(`/locales`)
export const fetchUsersByActivityId = (activityId: any) => axiosInstance.get(`/locales`)
export const createUser = (data: any) => axiosInstance.post(`/users/create`, { data })
export const updateUser = (data: any) => axiosInstance.put(`/locales`)
export const deleteUser = (userId: any) => axiosInstance.delete(`/locales`)

export const updateActivity = (activityId: string, data: any) => axiosInstance.put('/activities', { data })
export const deleteActivity = (activityId: string) => axiosInstance.post('/activities')
export const getActivitiesByGroup = (groupId: string) => axiosInstance.post(`/activities/group/${groupId}`)
