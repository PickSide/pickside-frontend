import { useEffect, useState } from 'react'

const useMyPosition = (): { lat: number; lng: number } => {
	const [lat, setLat] = useState<number>(0)
	const [lng, setLng] = useState<number>(0)

	useEffect(
		() =>
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude)
				setLng(position.coords.longitude)
			}),
		[],
	)

	return { lat, lng }
}

export default useMyPosition
