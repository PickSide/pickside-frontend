import React, { FC, useContext, useEffect, useMemo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, DialogActions, Container, Typography } from '@mui/material'
import { SportEvent } from 'state/sportEvent'
import { registerPlayerToSportEvent } from 'state/sportEvent'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { useTranslation } from 'react-i18next'

interface ConfirmRegisterEventFormProps {
	event: SportEvent
	onClose: () => void
}

const ConfirmRegisterEventForm: FC<ConfirmRegisterEventFormProps> = ({ event, onClose, ...props }) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	const isLevelLessThanRequired = useMemo(() => {
		return connectedUser && connectedUser.level && connectedUser.level < event.levelRequired
	}, [connectedUser, event])

	const onRegisterEvent = () => {
		dispatch<any>(registerPlayerToSportEvent(event.id))
		onClose()
	}

	return (
		<>
			<Container>
				{isLevelLessThanRequired ? (
					<Typography>
						{t(
							'Are you sure you want to register to this event? Your level is less than the required. You will have to wait for admin approval.',
						)}
					</Typography>
				) : (
					<Typography>
						{t('Are you sure you want to register to this event? You will have to wait for admin approval.')}
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