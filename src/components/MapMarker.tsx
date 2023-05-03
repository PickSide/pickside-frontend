import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { InfoWindow, Marker } from '@react-google-maps/api'
import { AppState } from 'state'

const MapMarker: FC<any> = ({ id, coords, children, icon, onWindowClose, onToggleOpen }) => {
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)

	return (
		<Marker position={coords} onClick={onToggleOpen} icon={icon}>
			{selectedActivity === id && (
				<InfoWindow onCloseClick={() => onWindowClose} position={coords}>
					{children}
				</InfoWindow>
			)}
		</Marker>
	)
}

export default memo(MapMarker)
