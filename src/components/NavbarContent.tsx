import React, { FC, useContext, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, IconButton } from '@mui/material'
import { Login, Person } from '@mui/icons-material'

import { Authentication, Dialog, ThemeToggler } from 'components'
import { AppState } from 'state'

const NavbarContent: FC<any> = ({ ...props }) => {
	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	const [openAuthenticationDialog, setOpenAuthenticationDialog] = useState<boolean>(false)

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
					<ThemeToggler />
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
