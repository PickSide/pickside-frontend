import React, { FC, useContext, useEffect, useMemo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, DialogActions, Container, Typography } from '@mui/material'
import { Activity } from 'state/activity'
import { registerPlayerToActivityEvent } from 'state/activity'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

interface ConfirmRegisterEventFormProps {
	event: Activity
	onClose: () => void
}

const ConfirmRegisterEventForm: FC<ConfirmRegisterEventFormProps> = ({ event, onClose, ...props }) => {
	const connectedUser = useSelector((state: AppState) => state.connectedUser)
	const dispatch = useDispatch()

	const isLevelLessThanRequired = useMemo(() => {
		return connectedUser && connectedUser.level && connectedUser.level < event.levelRequired
	}, [connectedUser, event])

	const onRegisterEvent = () => {
		dispatch<any>(registerPlayerToActivityEvent(event.id))
		onClose()
	}

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
