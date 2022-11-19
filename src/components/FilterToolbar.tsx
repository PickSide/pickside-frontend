import React, { FC, ChangeEvent, Dispatch, useState, useMemo, SetStateAction, ReactNode } from 'react'
import { styled } from '@mui/system'
import { SvgIconComponent, SportsSoccer, Height, LocationOn, Search } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { DefaultNavbar, Select } from 'components'

interface FilterToolbarProps {}

const FilterToolbar: FC<FilterToolbarProps> = ({ ...props }) => {
	return (
		<DefaultNavbar
			sx={{
				backgroundColor: 'common.white',
				boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
			}}
		>
			<Grid container justifyContent="center" columnSpacing={2}>
				<Grid item>
					<Select size="small"></Select>
				</Grid>
				<Grid item>
					<Select size="small"></Select>
				</Grid>
				<Grid item>
					<Select size="small"></Select>
				</Grid>
			</Grid>
		</DefaultNavbar>
	)
}

export default FilterToolbar
