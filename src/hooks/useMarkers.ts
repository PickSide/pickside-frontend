import { FC, useEffect, useMemo, useState } from 'react'
import { MarkerProps } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { setSelectedContext } from 'state/selectedContext'
import { SPORT_EVENTS_ID } from 'utils'

const useMarkers = (): { markerProps: MarkerProps[] } => {
	const dispatch = useDispatch()
	const sportEvents = useSelector((state: AppState) => state.sportEvents)

	const markerProps = useMemo<MarkerProps[] | any>(
		() =>
			sportEvents?.results?.map((e) => ({
				position: e.location.coords,
				onClick: () =>
					dispatch(
						setSelectedContext({
							[SPORT_EVENTS_ID]: {
								[e.id!]: true,
							},
						}),
					),
			})),
		[sportEvents],
	)

	return { markerProps }
}
export default useMarkers
