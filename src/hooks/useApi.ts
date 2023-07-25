import {
	Activity,
	AppState,
	addParticipants,
	deactivate,
	markAsRead,
	removeParticipants,
	setActivities,
	setAreas,
	setLocales,
	setNotifications,
	setPlayables,
	setSports,
	setUser,
	setUserEmpty,
	updateActivity,
	updateConfig,
	updateFavorite
} from 'state'

import { Dispatch } from '@reduxjs/toolkit'
import { useApiHelpers } from 'hooks'
import { useSelector } from 'react-redux'

interface UseApiOutput {
	/* Auth */
	deactivate: () => (d: Dispatch) => Promise<any>
	reactivate: (id: any) => (d: Dispatch) => Promise<any>
	login: (data: any) => (d: Dispatch) => Promise<any>
	loginWithGoogle: (data: any) => (d: Dispatch) => Promise<any>
	logout: () => (d: Dispatch) => Promise<any>
	token?: (data: any) => (d: Dispatch) => Promise<any>

	/* activites */
	getActivities: () => (d: Dispatch) => Promise<any>
	createActivity: (data: any) => (d: Dispatch) => Promise<any>
	getActivity?: (activityId: any) => (d: Dispatch) => Promise<any>
	updateActivity?: (activityId: any) => (d: Dispatch) => Promise<any>
	deleteActivity?: (activityId: any) => (d: Dispatch) => Promise<any>
	getActivitiesByGroup?: (groupId: any) => (d: Dispatch) => Promise<any>
	registerSelfToActivity: (activityId: any) => (d: Dispatch) => Promise<any>
	unregisterSelfFromActivity: (activityId: any) => (d: Dispatch) => Promise<any>
	updateFavorite: (activityId: any) => (d: Dispatch) => Promise<any>

	/* predefined areas */
	getPredefinedAreas: () => (d: Dispatch) => Promise<any>

	/* Courts */
	getCourts: () => (d: Dispatch) => Promise<any>

	/* Custom Courts */
	getCustomCourts?: () => (d: Dispatch) => Promise<any>
	addCustomCourt?: (data: any) => (d: Dispatch) => Promise<any>
	getCustomCourtById?: (courtId: any) => (d: Dispatch) => Promise<any>
	deleteCustomCourt?: (courtId: any) => (d: Dispatch) => Promise<any>
	getCustomCourtsCreatedByUser?: (userId: any) => (d: Dispatch) => Promise<any>
	deleteCustomCourtsCreatedByUser?: (userId: any) => (d: Dispatch) => Promise<any>

	/* email */
	verifyEmail?: (data: any) => (d: Dispatch) => Promise<any>

	/* locales */
	getLocales: () => (d: Dispatch) => Promise<any>

	/* notifications */
	getNotifications: () => (d: Dispatch) => Promise<any>
	markNotificationAsRead: (notificationId: any) => (d: Dispatch) => Promise<any>

	/* user */
	getUsers?: () => (d: Dispatch) => Promise<any>
	createUser: (data: any) => (d: Dispatch) => Promise<any>
	getUserById?: (userId: any) => (d: Dispatch) => Promise<any>
	updateUser: (data: any) => (d: Dispatch) => Promise<any>
	deleteUser?: (userId: any) => (d: Dispatch) => Promise<any>
	getUsersByGroupId?: (groupId: any) => (d: Dispatch) => Promise<any>
	getUsersByActivityId?: (activityId: any) => (d: Dispatch) => Promise<any>

	/* sports */
	getSports: () => (d: Dispatch) => Promise<any>
}

const useApi = (): UseApiOutput => {
	const user = useSelector((state: AppState) => state.user)
	const { getItem, getItems, putItem, postItem } = useApiHelpers()

	return {
		deactivate:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					await getItem({ endpoint: 'users/deactivate', id: user?.id })(dispatch).then((response) => {
						if (response) {
							dispatch<any>(deactivate())
						}
						return response
					})
				},

		reactivate:
			(id: any) =>
				async (dispatch: Dispatch): Promise<any> => {
					return await putItem({ endpoint: 'users/reactivate', id })(dispatch)
				},

		createUser:
			(data: any) =>
				async (dispatch: Dispatch): Promise<any> => {
					return await postItem({ endpoint: 'users/create', data })(dispatch).then((response) => {
						if (response) {
							dispatch<any>(setUser(response))
						}
						return response
					})
				},

		login:
			(data: any) =>
				async (dispatch: Dispatch): Promise<any> => {
					return await postItem({ endpoint: 'login', data })(dispatch).then((response) => {
						if (response) {
							dispatch<any>(setUser(response))
						}
						return response
					})
				},

		loginWithGoogle:
			(data: any) =>
				async (dispatch: Dispatch): Promise<any> => {
					return await postItem({ endpoint: 'googlelogin', data })(dispatch).then((response) => {
						if (response) {
							dispatch<any>(setUser(response))
						}
						return response
					})
				},

		logout:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await postItem({ endpoint: 'logout' })(dispatch)
					if (items) {
						dispatch<any>(setUserEmpty())
					}
				},

		getPredefinedAreas:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const data = await getItems({
						endpoint: 'predefined-areas',
					})(dispatch)

					if (data) {
						dispatch(setAreas(data))
					}
				},

		getActivities:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const data = await getItems({
						endpoint: 'activities',
					})(dispatch)

					if (data) {
						dispatch(setActivities(data))
					}
				},

		createActivity:
			(data: Activity) =>
				async (dispatch: Dispatch): Promise<any> => {
					const createdActivity = await postItem({
						endpoint: 'activities',
						data: { ...data, organiser: user?.username },
					})(dispatch)

					if (createdActivity) {
						dispatch(updateActivity(createdActivity.response))
					}
				},

		registerSelfToActivity:
			(activityId: string) =>
				async (dispatch: Dispatch): Promise<any> => {
					const updatedItem = await putItem({
						endpoint: 'activities',
						id: activityId,
						data: { userId: user?.id },
						extra: 'register'
					})(dispatch)

					if (updatedItem) {
						await dispatch(addParticipants({ activityId, userId: user?.id }))
					}
				},

		unregisterSelfFromActivity:
			(activityId: string) =>
				async (dispatch: Dispatch): Promise<any> => {
					const updatedItem = await putItem({
						endpoint: 'activities',
						id: activityId,
						data: { userId: user?.id },
						extra: 'unregister'
					})(dispatch)

					if (updatedItem) {
						await dispatch(removeParticipants({ activityId, userId: user?.id }))
					}
				},

		updateFavorite: (id: string) =>
			async (dispatch: Dispatch): Promise<any> => {
				const updatedItem = await putItem({
					endpoint: 'activities',
					id,
					extra: 'favorites',
					data: { userId: user?.id },
				})(dispatch)

				if (updatedItem) {
					dispatch(updateFavorite(updatedItem.data.result))
				}
			},

		getLocales:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await getItems({
						endpoint: 'locales',
					})(dispatch)

					if (items) {
						dispatch(setLocales(items))
					}
				},

		getNotifications:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await getItems({
						endpoint: 'notifications',
						id: user?.id,
					})(dispatch)

					if (items) {
						dispatch(setNotifications(items))
					}
				},

		markNotificationAsRead:
			(notificationId: string) =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await putItem({
						endpoint: `notifications/${notificationId}/users/${user?.id}`,
					})(dispatch)

					if (items) {
						dispatch(markAsRead(notificationId))
					}
				},

		getCourts:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await getItems({
						endpoint: 'courts',
					})(dispatch)

					if (items) {
						dispatch(setPlayables(items))
					}
				},

		getSports:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await getItems({
						endpoint: 'sports',
					})(dispatch)

					if (items) {
						dispatch(setSports(items))
					}
				},

		updateUser:
			(data) =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await putItem({
						endpoint: `users/${user?.id}/settings`,
						data,
					})(dispatch)

					if (items) {
						dispatch(updateConfig(data))
					}
				},
	}
}

export default useApi