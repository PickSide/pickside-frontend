import React, { FC, useState } from 'react'
import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import { Autocomplete, DatePicker, Dialog, NavbarWrapper } from 'components'
import { RegisterEventForm, SelectSports } from 'widgets'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'hooks'

const FilterToolbar: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()
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
			<Grid
				container
				alignItems="center"
				wrap="nowrap"
				sx={{
					boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
					minHeight: (theme) => theme.mixins.toolbar.minHeight,
				}}
			>
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
		</>
	)
}

export default FilterToolbar
