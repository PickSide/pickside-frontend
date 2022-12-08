import React, { FC, ChangeEvent, Dispatch, useState, useMemo, SetStateAction, ReactNode } from 'react'
import { styled } from '@mui/system'
import { SvgIconComponent, SportsSoccer, Height, LocationOn, Search } from '@mui/icons-material'
import { Grid, IconButton, MenuItem } from '@mui/material'
import { Autocomplete, DatePicker, DefaultNavbar, Select } from 'components'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { camelCase } from 'lodash'

const FilterToolbar: FC<any> = ({ ...props }) => {
	const sports = useSelector((state: AppState) => state.sports)

	return (
		<DefaultNavbar
			sx={{
				backgroundColor: 'common.white',
				boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
			}}
		>
			<Grid container justifyContent="center" columnSpacing={2}>
				<Grid item>
					<Select placeholder="Select a sport" size="small">
						{sports?.results?.map((sportType, idx) => (
							<MenuItem key={idx} value={sportType.id}>
								{sportType.description}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Grid item>
					<DatePicker />
				</Grid>
				<Grid item>
					<Autocomplete size="small" />
				</Grid>
			</Grid>
		</DefaultNavbar>
	)
}

export default FilterToolbar
