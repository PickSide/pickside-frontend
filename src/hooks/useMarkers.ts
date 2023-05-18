import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, setSelectedContext } from 'state'
import { SPORT_EVENTS_ID } from 'utils'

const useMarkers = (): { markerProps: any[] } => {
	const dispatch = useDispatch()
	const activities = useSelector((state: AppState) => state.activities)
	const selectedEvent = useSelector((state: AppState) => state.selectedContexts?.[SPORT_EVENTS_ID])

	const markerProps = useMemo<any>(
		() =>
			activities?.results?.map((e) => ({
				onClick: () =>
					dispatch(
						setSelectedContext({
							[SPORT_EVENTS_ID]: {
								[e.id!]: true,
							},
						}),
					),
			})),
		[selectedEvent, activities],
	)

	return { markerProps }
}
export default useMarkers
