import { MarkerProps } from '@react-google-maps/api'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

interface MarkerInfo extends MarkerProps {
	activityId?: string
}

const useMarkers = (): { markers: MarkerInfo[] } => {
	const markersProps = useSelector((state: AppState) => state.markers)
	const [markers, setMarkers] = useState<JSX.Element[] | any>()

	useEffect(() => {
		const MarkersArray = markersProps?.map((marker, idx) => ({
			activityId: marker.activityId,
			position: { lat: marker.lat(), lng: marker.lng() },
		})) as MarkerInfo[]

		setMarkers(MarkersArray)
	}, [markersProps])

	return { markers }
}
export default useMarkers
