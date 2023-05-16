import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle, IconButton, Slide, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

import { motion } from 'framer-motion'

import { AppState } from 'state'
import { toPascalCase, fadeIn } from 'utils'

const GlobalAppStatusAlert: FC<any> = () => {
	const appStatus = useSelector((state: AppState) => state.appStatus)
	const [open, setOpen] = useState(!!appStatus)

	return (
		<div className="fixed z-50 w-full xl:w-[700px] xl:left-1/2 xl:-translate-x-1/2">
			<Slide direction="down" in={!!appStatus && open} mountOnEnter unmountOnExit>
				<Alert
					severity={appStatus?.status}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false)
							}}
						>
							<Close fontSize="inherit" />
						</IconButton>
					}
				>
					<AlertTitle>{toPascalCase(appStatus?.status)} </AlertTitle>
					<Typography>{appStatus?.message}</Typography>
				</Alert>
			</Slide>
		</div>
	)
}

export default GlobalAppStatusAlert
