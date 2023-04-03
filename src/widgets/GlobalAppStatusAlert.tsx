import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle, Box, BoxProps, Slide, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { AppState } from 'state'
import { toPascalCase } from 'utils/common'

const AlertBox = styled(Box)<BoxProps>(({ theme }) => {
	const fixedWidth = 700
	return {
		position: 'fixed',
		right: `calc(50% - ${fixedWidth / 2}px)`,
		left: `calc(50% - (${fixedWidth / 2}px))`,
		width: fixedWidth,
		zIndex: 9999,
	}
})

const GlobalAppStatusAlert: FC<any> = () => {
	const appStatus = useSelector((state: AppState) => state.appStatus)
	return (
		<AlertBox>
			<Slide direction="down" in={!!appStatus} mountOnEnter unmountOnExit>
				<Alert severity={appStatus?.status}>
					<AlertTitle>{toPascalCase(appStatus?.status)} </AlertTitle>
					<Typography>{appStatus?.message}</Typography>
				</Alert>
			</Slide>
		</AlertBox>
	)
}

export default GlobalAppStatusAlert
