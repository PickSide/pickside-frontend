import { FC, memo } from 'react'
import { Marker } from '@react-google-maps/api'
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons'

const MapMarker: FC<any> = ({ activity, coords, ...props }) => {
	return (
		<Marker
			position={coords}
			icon={{
				path: faPersonRunning.icon[4] as string,
				fillColor: '#0071fb',
				fillOpacity: 1,
				strokeWeight: 0.5,
				strokeColor: '#0093ff',
				scale: 0.05,
			}}
		/>
	)
}

export default memo(MapMarker)
