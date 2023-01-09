import React, { FC, useState } from 'react'
import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { Autocomplete, DatePicker, Dialog, NavbarWrapper } from 'components'
import { RegisterEventForm, SelectSports } from 'widgets'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'

const FilterToolbar: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()
	const isdarkModeEnabled = useSelector((state: AppState) => state.appConfig?.darkModeEnabled)
	const [openCreateNewEventDialog, setOpenCreateNewEventDialog] = useState<boolean>(false)

	return (
		<>
			<Dialog
				title={t('Create a new event')}
				open={openCreateNewEventDialog}
				onClose={() => setOpenCreateNewEventDialog(false)}
			>
				<RegisterEventForm onClose={() => setOpenCreateNewEventDialog(false)} />
			</Dialog>
			<NavbarWrapper
				sx={{
					backgroundColor: `${isdarkModeEnabled ? 'common.black' : 'common.white'}`,
					boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
				}}
			>
				<Grid container wrap="nowrap">
					<Grid item container justifyContent="center" columnSpacing={2} xs={10}>
						<Grid item>
							<SelectSports />
						</Grid>
						<Grid item>
							<DatePicker />
						</Grid>
						<Grid item>
							<Autocomplete size="small" />
						</Grid>
					</Grid>
					<Grid item container justifyContent="flex-end" alignContent="center" xs>
						<Grid item marginX={4}>
							<Button
								fullWidth
								variant="contained"
								size="small"
								startIcon={<Add />}
								onClick={() => setOpenCreateNewEventDialog(true)}
							>
								{t('Add event')}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</NavbarWrapper>
		</>
	)
}

export default FilterToolbar
