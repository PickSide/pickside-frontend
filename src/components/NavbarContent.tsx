import React, { FC, useContext, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, IconButton } from '@mui/material'
import { Login, Person } from '@mui/icons-material'

import { Authentication, Dialog, FormikSwitch } from 'components'
import { AppContext } from 'utils'
import { AppState } from 'state'
import { setAppConfig } from 'state/config'

const NavbarContent: FC<any> = ({ ...props }) => {
	const { connectedUser } = useContext(AppContext)
	const dispatch = useDispatch()

	const appConfig = useSelector((state: AppState) => state.appConfig)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)
	const initialDarkModeOn = useMemo(() => appConfig?.darkModeOn || false, [appConfig])

	return (
		<>
			<Dialog
				open={openAuthenticationDialog}
				onClose={() => setOpenAuthenticationDialog(false)}
				title="Authentication"
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				size="sm"
			>
				<Authentication />
			</Dialog>

			<Grid container justifyContent="flex-end" alignItems="center">
				<Grid item>
					<FormikSwitch
						label="Dark mode"
						name="darkMode"
						freeSolo
						checked={initialDarkModeOn}
						onChange={(e) => dispatch(setAppConfig({ darkModeOn: e.target.checked }))}
					/>
				</Grid>
				<Grid item>
					{connectedUser ? (
						<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
							<Person />
						</IconButton>
					) : (
						<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
							<Login />
						</IconButton>
					)}
				</Grid>
			</Grid>
		</>
	)
}

export default NavbarContent
