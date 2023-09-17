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

const requestIntercept = axiosInstance.interceptors.request.use(
	(config) => {
		if (config.headers && !config.headers['Authorization']) {
			config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('auth.accessToken')}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

const responseIntercept = axiosInstance.interceptors.response.use(
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

export default function helpers() {
	const fetchGoogleAccountInfoServiceAPI = (accessToken: string) =>
		axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/json',
			},
		})

	const deactivate = (id: string) => axiosInstance.get(`/users/deactivate/${id}`)
	const reactivate = (id: string) => axiosInstance.put(`/users/deactivate/${id}`)
	const refreshToken = () => axiosInstance.get('/token')
	const loginUser = (data: any) => axiosInstance.post('/login', { data })
	const loginUserWithGoogle = (data: any) => axiosInstance.post('/googlelogin', { data })
	const logoutUser = (data: any) => axiosInstance.post('/logout', { data })
	const resetDb = () => axiosInstance.post('/resetdb')

	//done
	const fetchActivities = () => axiosInstance.get(`/activities`)
	const fetchActivity = (activityId: string) => axiosInstance.get(`/activities/${activityId}`)
	const createActivity = (data: any) => axiosInstance.post(`/activities`, { data })
	const registerSelfToActivity = (activityId: string, userId: string) =>
		axiosInstance.put(`/activities/register/${activityId}`, { userId })
	const unregisterSelfFromActivity = (activityId: string, userId: string) =>
		axiosInstance.put(`/activities/unregister/${activityId}`, { userId })
	const updateFavorite = (activityId: string, userId: string) => axiosInstance.put('/activities/favorites', { userId })
	//done
	const fetchLocales = () => axiosInstance.get(`/locales`)

	const getNotifications = (userId: string) => axiosInstance.get(`/notifications/${userId}`)
	const markNotificationAsRead = (notificationId: string, userId: string) =>
		axiosInstance.put(`/notifications/${notificationId}/${userId}`)

	const fetchUsers = () => axiosInstance.get(`/locales`)
	const fetchUserById = (userId: any) => axiosInstance.get(`/locales`)
	const fetchUsersByGroupId = (groupId: any) => axiosInstance.get(`/locales`)
	const fetchUsersByActivityId = (activityId: any) => axiosInstance.get(`/locales`)
	const createUser = (data: any) => axiosInstance.post(`/users/create`, { data })
	const updateUserSettings = (data: any, userId: string) => axiosInstance.put(`users/${userId}/settings`, { data })
	const deleteUser = (userId: any) => axiosInstance.delete(`/locales`)

	const updateActivity = (activityId: string, data: any) => axiosInstance.put('/activities', { data })
	const deleteActivity = (activityId: string) => axiosInstance.post('/activities')
	const getActivitiesByGroup = (groupId: string) => axiosInstance.post(`/activities/group/${groupId}`)

	return {
		fetchGoogleAccountInfoServiceAPI,
		deactivate,
		reactivate,
		refreshToken,
		loginUser,
		loginUserWithGoogle,
		logoutUser,
		resetDb,
		fetchActivities,
		fetchActivity,
		createActivity,
		registerSelfToActivity,
		unregisterSelfFromActivity,
		updateFavorite,
		fetchLocales,
		getNotifications,
		markNotificationAsRead,
		fetchUsers,
		fetchUserById,
		fetchUsersByGroupId,
		fetchUsersByActivityId,
		createUser,
		updateUserSettings,
		deleteUser,
		updateActivity,
		deleteActivity,
		getActivitiesByGroup,
	}
}
