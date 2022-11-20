import React, { FC, useContext, useEffect, useMemo, useCallback, useState } from 'react'

import { Button, DialogActions, Container, Typography } from '@mui/material'
import { Activity } from 'state/activity'
import { AppContext } from 'utils'

interface ConfirmRegisterEventFormProps {
	event: Activity
	onClose: () => void
}

const ConfirmRegisterEventForm: FC<ConfirmRegisterEventFormProps> = ({ event, onClose, ...props }) => {
	const userContext = useContext(AppContext)

	const isLevelLessThanRequired = useMemo(() => {
		if (userContext.level) {
			return userContext.level < event.levelRequired
		}
		return false
	}, [event, userContext])

	const onRegisterEvent = () => {}

	return (
		<>
			<Container>
				{isLevelLessThanRequired ? (
					<Typography>
						Are you sure you want to register to this event? Your level is less than the required. You will have to wait
						for admin approval.
					</Typography>
				) : (
					<Typography>
						Are you sure you want to register to this event? You will have to wait for admin approval.
					</Typography>
				)}
			</Container>
			<DialogActions>
				<Button autoFocus onClick={() => onClose()}>
					Cancel
				</Button>
				<Button variant="contained" onClick={() => onRegisterEvent()}>
					Register
				</Button>
			</DialogActions>
		</>
	)
}

export default ConfirmRegisterEventForm
