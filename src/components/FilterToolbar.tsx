import React, { FC, ChangeEvent, Dispatch, useState, useMemo, SetStateAction, ReactNode } from 'react'
import { styled } from '@mui/system'
import { Add, SvgIconComponent, SportsSoccer, Height, LocationOn, Search } from '@mui/icons-material'
import { Button, Grid, IconButton, MenuItem } from '@mui/material'
import { Autocomplete, DatePicker, DefaultNavbar, Dialog, RegisterEventForm, Select } from 'components'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { camelCase } from 'lodash'

const FilterToolbar: FC<any> = ({ ...props }) => {
	const sports = useSelector((state: AppState) => state.sports)
	const [openCreateNewEventDialog, setOpenCreateNewEventDialog] = useState<boolean>(false)

	return (
		<>
			<Dialog
				title={`Create a new event`}
				open={openCreateNewEventDialog}
				onClose={() => setOpenCreateNewEventDialog(false)}
			>
				<RegisterEventForm onClose={() => setOpenCreateNewEventDialog(false)} />
			</Dialog>
			<DefaultNavbar
				sx={{
					backgroundColor: 'common.white',
					boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
				}}
			>
				<Grid container wrap="nowrap">
					<Grid item container justifyContent="center" columnSpacing={2} xs={10}>
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
					<Grid item container justifyContent="flex-end" xs>
						<Grid item>
							<Button
								fullWidth
								variant="contained"
								size="medium"
								startIcon={<Add />}
								onClick={() => setOpenCreateNewEventDialog(true)}
							>
								Add event
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</DefaultNavbar>
		</>
	)
}

export default FilterToolbar
