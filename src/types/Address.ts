export interface Coordinates {
	lat?: number
	lng?: number
}
export interface Address extends google.maps.GeocoderResult {
	propertyNumber?: number
	streetName?: string
	city?: string
	zipCode?: string
	building?: string
	company?: string
	coords?: Coordinates
}
