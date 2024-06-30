import { MenuItem, QueryAutocomplete } from '@components'
import { Ref, useContext } from 'react'

import { AxiosContext } from '@context'
import { User } from '@state'
import { useTranslation } from 'react-i18next'

interface LocationAutocompleteProps {
	debounceValue?: number
	onSelectAction?: (o: google.maps.places.AutocompletePrediction) => any
}

const LocationAutocomplete = ({
	debounceValue = 500,
	onSelectAction,
}: LocationAutocompleteProps & { myRef?: Ref<HTMLInputElement> }) => {
	const { extsvcInstance } = useContext(AxiosContext)
	const { t } = useTranslation()

	const queryFn = async (searchText: string, params: Record<string, any> = {}): Promise<any[]> => {
		const response = await extsvcInstance.get('predictions', {
			params: {
				...params,
				input: searchText,
			},
		})
		return response.data.result
	}

	return (
		<QueryAutocomplete
			queryFn={queryFn}
			clearable
			fullWidth
			endpoint="/predictions"
			getOptionLabel={(option: google.maps.places.AutocompletePrediction) =>
				option.structured_formatting.main_text || ''
			}
			getOptionValue={(option: google.maps.places.AutocompletePrediction) =>
				option.structured_formatting.main_text || ''
			}
			loadingText={t('Looking for users')}
			noOptionText={t('Type to search for location')}
			placeholder={t('Search area')}
			onChange={onSelectAction}
			renderInput={(option: google.maps.places.AutocompletePrediction) => (
				<MenuItem>
					<span>{option.structured_formatting.main_text}</span>
				</MenuItem>
			)}
		/>
	)
}

export default LocationAutocomplete
