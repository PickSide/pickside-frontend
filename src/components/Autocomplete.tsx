import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Autocomplete as MuiAutocomplete, AutocompleteProps, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

const Autocomplete: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()
	
	return (
		<MuiAutocomplete
			freeSolo
			disableClearable
			options={[]}
			renderInput={(params) => (
				<TextField
					{...params}
					label={t('Filter by region')}
					InputProps={{
						...params.InputProps,
						type: 'search',
					}}
				/>
			)}
			popupIcon={<Search />}
			{...props}
		/>
	)
}

export default Autocomplete
