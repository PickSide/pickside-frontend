import { useEffect, useRef } from 'react'

const MyMapComponent = ({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) => {
	const ref = useRef()

	useEffect(() => {
		new window.google.maps.Map(ref.current!, {
			center,
			zoom,
            
		})
	})
	//@ts-ignore
	return <div ref={ref} id="map" />
}

export default MyMapComponent
