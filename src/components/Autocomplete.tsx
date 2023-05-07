import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

interface AutocompleteProps {
	placeholder?: string
	label?: string
	options?: any[]
}

const Autocomplete: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()

	//const [onFocus, setOnFocus] = -useState<boolean>(false)

	useEffect(() => {}, [])

	return (
		<>
			<div className="relative w-fit">
				<input
					className="relative rounded h-[50px] p-5 focus:outline-primary focus:border-primary outline-0 focus:outline-2"
					id="autocomplete"
					type="text"
					placeholder="Type"
					//onFocus={() => setOnFocus(true)}
				/>
				<label htmlFor="autocomplete" className="absolute top-1/2 -translate-y-1/2 right-2">
					<span>
						<FaSearch size={20} />
					</span>
				</label>
			</div>
		</>
		// <MuiAutocomplete
		// 	freeSolo
		// 	disableClearable
		// 	options={[]}
		// 	renderInput={(params) => (
		// 		<TextField
		// 			{...params}
		// 			label={t('Filter by region')}
		// 			InputProps={{
		// 				...params.InputProps,
		// 				type: 'search',
		// 			}}
		// 		/>
		// 	)}
		// 	popupIcon={<Search />}
		// 	{...props}
		// />
	)
}

export default Autocomplete
