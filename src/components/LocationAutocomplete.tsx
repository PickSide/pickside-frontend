import { MenuItem } from '@components'
import QueryAutocompleteV2 from '@components/QueryAutocompleteV2'
import { Ref, useContext } from 'react'

import { AxiosContext } from '@context'
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
		return response.data.result || []
	}

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: 'bg-blue-500',
			borderColor: state.isFocused ? '#80bdff' : '#ced4da',
			boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
			width: '100%',
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? '#80bdff' : state.isFocused ? '#f1f1f1' : '#fff',
			color: state.isSelected ? '#fff' : '#333',
			padding: 10,
			cursor: 'pointer',
		}),
		menu: (provided) => ({
			...provided,
			marginTop: 0,
			borderRadius: '0.25rem',
		}),
	}

	return (
		<QueryAutocompleteV2
			queryFn={queryFn}
			clearable
			fullWidth
			customStyles={customStyles}
			endpoint="/predictions"
			getOptionLabel={(option: google.maps.places.AutocompletePrediction) => option.description || ''}
			getOptionValue={(option: google.maps.places.AutocompletePrediction) => option.place_id || ''}
			loadingText={t('Search location')}
			noOptionText={t('No result found')}
			placeholder={t('Search for location')}
			onChange={onSelectAction}
			renderInput={(option: google.maps.places.AutocompletePrediction) => (
				<MenuItem>
					<span>{option.description}</span>
				</MenuItem>
			)}
		/>
	)
}

export default LocationAutocomplete
