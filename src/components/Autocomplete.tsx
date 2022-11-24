import { FC } from 'react'
import { Autocomplete as MuiAutocomplete, AutocompleteProps, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

const Autocomplete: FC<any> = ({ ...props }) => {
	return (
		<MuiAutocomplete
			freeSolo
			disableClearable
			options={[]}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Filter by region"
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
