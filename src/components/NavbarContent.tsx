import React, { FC, useState, Dispatch, SetStateAction } from 'react'
import { Box, IconButton } from '@mui/material'
import { Login } from '@mui/icons-material'

import { Authentication, Dialog } from 'components'

interface NavbarContentProps {
	setOpenAuthenticationDialog?: Dispatch<SetStateAction<boolean>>
}

const NavbarContent: FC<any> = ({ ...props }) => {
	// const pages = ['Products', 'Pricing', 'Blog']
	// const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
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

			<Box {...props} display="flex" justifyContent="flex-end" sx={{ width: 1, marginLeft: 2, marginRight: 2 }}>
				<IconButton onClick={() => setOpenAuthenticationDialog(true)}>
					<Login />
				</IconButton>
			</Box>
		</>
	)
}

export default NavbarContent
