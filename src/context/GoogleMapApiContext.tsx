import { FC, ReactNode, createContext, useCallback, useState } from 'react'

import { Loader } from '@googlemaps/js-api-loader'

export interface GoogleMapApiContextProps {
	children?: ReactNode
	isLoaded?: boolean
	map?: any
	onLoad?: any
	onUnmount?: any
}

const GoogleMapApiContext = createContext<GoogleMapApiContextProps>({})

export const GoogleMapApiProvider: FC<any> = ({ children }) => {
	let map: google.maps.Map

	const additionalOptions = {}

	const loader = new Loader({
		apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
		libraries: ['places'],
		version: 'weekly',
		...additionalOptions,
	})
	console.log(loader)
	loader.importLibrary('maps').then(async () => {
		const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
		map = new Map(document.getElementById('map') as HTMLElement, {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8,
		})
	})
	return <GoogleMapApiContext.Provider value={{}}>{children}</GoogleMapApiContext.Provider>
}

export default GoogleMapApiContext
