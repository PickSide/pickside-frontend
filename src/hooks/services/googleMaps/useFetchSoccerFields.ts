import { AppState } from '@state'
import { AxiosContext } from '@context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const useFetchSoccerFields = () => {
	const { gMapsApiInstance } = useContext(AxiosContext)

	const me = useSelector((state: AppState) => state.user)

	const callback = async () => {
		const geocode = await gMapsApiInstance.get('/geocode/json', {
			params: {
				address: me?.preferredRegion,
				key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
			},
		})
		const { lat, lng } = geocode.data.results[0].geometry.location
		const fields = await gMapsApiInstance.get('/place/nearbysearch/json', {
			params: {
				key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
				keyword: 'soccer+field',
				location: `${lat},${lng}`,
				radius: 10000,
			},
		})
		console.log(fields.data.results)
		return fields
	}

	const {
		data: fields,
		isLoading,
		refetch,
	} = useQuery(['fetch-soccer-fields'], callback, {
		enabled: false,
		refetchOnWindowFocus: false,
	})

	return { fields, isLoading, refetch }
}

export default useFetchSoccerFields
