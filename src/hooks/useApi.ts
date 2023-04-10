import { Dispatch } from '@reduxjs/toolkit'
import { fetchItems, updateItem } from 'api'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { setLocales } from 'state/locales'
import { setSports } from 'state/sport'
import { setEvents, updateEvent, SportEvent } from 'state/sportEvent'

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

	/* sports */
	getSports: () => (d: Dispatch) => Promise<any>
}

const useApi = (): UseApiOutput => {
	const account = useSelector((state: AppState) => state.account)
	return {
		getActivities:
			() =>
			async (dispatch: Dispatch): Promise<any> => {
				const data = await fetchItems({
					endpoint: 'activities',
					secure: false,
				})(dispatch)

				if (data) {
					dispatch(setEvents(data))
				}
			},
		createActivity:
			(event: SportEvent) =>
			async (dispatch: Dispatch): Promise<any> => {
				const updatedItem = await updateItem({
					endpoint: 'events',
					id: account?.id,
					data: { userId: account?.id },
					secure: false,
				})(dispatch)

				if (updatedItem) {
					dispatch(updateEvent(updatedItem.data.response))
				}
			},
		registerToActivity:
			(event: SportEvent) =>
			async (dispatch: Dispatch): Promise<any> => {
				const updatedItem = await updateItem({
					endpoint: 'events',
					id: event.id,
					data: { userId: account?.id },
					secure: false,
				})(dispatch)

				if (updatedItem) {
					dispatch(updateEvent(updatedItem.data.response))
				}
			},

		getLocales:
			() =>
			async (dispatch: Dispatch): Promise<any> => {
				const items = await fetchItems({
					endpoint: 'locales',
					secure: false,
				})(dispatch)

				if (items) {
					dispatch(setLocales(items))
				}
			},

		getSports:
			() =>
			async (dispatch: Dispatch): Promise<any> => {
				const items = await fetchItems({
					endpoint: 'sports',
					secure: false,
				})(dispatch)

				if (items) {
					dispatch(setSports(items))
				}
			},
	}
}
export default useApi
