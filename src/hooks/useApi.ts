import { Dispatch } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppState, setLocales, setSports, setActivities, updateActivity, Activity, setSettingsTemplate, setPlayables } from 'state'
import { useCalls } from 'hooks'
import { API_URL } from 'api'

interface UseApiOutput {
	/* account */
	updateAccount?: (data: any) => (d: Dispatch) => Promise<any>

	/* activites */
	createActivity: (data: any) => (d: Dispatch) => Promise<any>
	getActivity?: (id: any) => (d: Dispatch) => Promise<any>
	getActivities: () => (d: Dispatch) => Promise<any>
	registerToActivity: (data: any) => (d: Dispatch) => Promise<any>

	/* locales */
	getLocales: () => (d: Dispatch) => Promise<any>

	/* Playables */
	getPlayables: () => (d: Dispatch) => Promise<any>

	/* sports */
	getSports: () => (d: Dispatch) => Promise<any>

	/* sports */
	getSettingsTemplate: () => (d: Dispatch) => Promise<any>
}

const useApi = (): UseApiOutput => {
	const { getItems, putItem } = useCalls({ baseURL: API_URL })

	const account = useSelector((state: AppState) => state.account)

	return {
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
			(event: Activity) =>
				async (dispatch: Dispatch): Promise<any> => {
					const updatedItem = await putItem({
						endpoint: 'events',
						id: account?.id,
						data: { userId: account?.id },
					})(dispatch)

					if (updatedItem) {
						dispatch(updateActivity(updatedItem.data.response))
					}
				},
		registerToActivity:
			(id: string) =>
				async (dispatch: Dispatch): Promise<any> => {
					const updatedItem = await putItem({
						endpoint: 'activities',
						id,
						data: { userId: account?.id },
					})(dispatch)

					if (updatedItem) {
						dispatch(updateActivity(updatedItem.data.response))
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

		getPlayables:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await getItems({
						endpoint: 'playables',
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

		getSettingsTemplate:
			() =>
				async (dispatch: Dispatch): Promise<any> => {
					const items = await getItems({
						endpoint: 'settings',
					})(dispatch)

					if (items) {
						dispatch(setSettingsTemplate(items))
					}
				},
	}
}
export default useApi
