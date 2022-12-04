import { FC, memo, useEffect, useState } from 'react'
import { MarkerF, MarkerProps as GoogleMapMarkerProps } from '@react-google-maps/api'

interface MarkerProps extends GoogleMapMarkerProps {
	uuid?: string
}

const Marker: FC<MarkerProps> = ({ ...props }) => {
	const SCALE_DEFAULT = 30

	return (
		<MarkerF
			icon={{
				url: `https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-blue.png&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1`,
				scaledSize: new google.maps.Size(SCALE_DEFAULT, SCALE_DEFAULT),
			}}
			{...props}
		/>
	)
}

export default memo(Marker)
