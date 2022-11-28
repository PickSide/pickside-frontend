import { MarkerF as Marker, MarkerProps } from '@react-google-maps/api'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

const MarkerComponent = (props: MarkerProps): JSX.Element => <Marker {...props} />

const useMarkers = (): { markers: JSX.Element[] } => {
	const markersProps = useSelector((state: AppState) => state.markers)
	const [markers, setMarkers] = useState<JSX.Element[] | any>()

	useEffect(() => {
		const MarkersArray = markersProps?.map((marker, idx) => (
			<MarkerComponent key={idx} position={{ lat: marker.lat(), lng: marker.lng() }} />
		))
		console.log(MarkersArray)
		setMarkers(MarkersArray)
	}, [markersProps])

	return { markers }
}
export default useMarkers
