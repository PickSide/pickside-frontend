import { FC, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MarkerF, MarkerProps } from '@react-google-maps/api'
import { SPORT_EVENTS_ID } from 'utils'
import { AppState } from 'state'

const Marker: FC<MarkerProps> = ({ ...props }) => {
	const SCALE_DEFAULT = 2

	const selectedSportEvent = useSelector((state: AppState) => state.selectedContexts?.[SPORT_EVENTS_ID])

	const svgMarker = useMemo(
		() => ({
			path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
			fillColor: 'red',
			fillOpacity: 0.6,
			strokeWeight: 0,
			rotation: 0,
			scale: SCALE_DEFAULT,
			anchor: new google.maps.Point(15, 30),
		}),
		[selectedSportEvent],
	)

	const addtionalProps = useMemo<Omit<MarkerProps, 'position' | 'icon'>>(
		() => ({
			clickable: true,
			icon: svgMarker,
		}),
		[],
	)

	return <MarkerF {...props} {...addtionalProps} />
}

export default memo(Marker)
