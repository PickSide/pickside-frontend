import { FC, useCallback, useMemo } from 'react'
import { MarkerProps } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { setSelectedContext } from 'state/selectedContext'
import { SPORT_EVENTS_ID } from 'utils'

const useMarkers = (): { markerProps: MarkerProps[] } => {
	const dispatch = useDispatch()
	const sportEvents = useSelector((state: AppState) => state.sportEvents)
	const selectedEvent = useSelector((state: AppState) => state.selectedContexts?.[SPORT_EVENTS_ID])

	const markerProps = useMemo<MarkerProps[] | any>(
		() =>
			sportEvents?.results?.map((e) => ({
				sportEventId: e.id,
				position: e.location,
				opacity: selectedEvent?.[e.id!] ? 1 : 0.5,
				scaleSize: 2,
				onClick: () =>
					dispatch(
						setSelectedContext({
							[SPORT_EVENTS_ID]: {
								[e.id!]: true,
							},
						}),
					),
			})),
		[selectedEvent, sportEvents],
	)

	return { markerProps }
}
export default useMarkers
