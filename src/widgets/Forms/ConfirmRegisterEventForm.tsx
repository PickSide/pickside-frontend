import { FC, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Container, DialogActions, Grid, Typography } from '@mui/material'
import { SportEvent } from 'state/sportEvent'
import { register } from 'state/sportEvent'
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
	const connectedUser = useSelector((state: AppState) => state.account)

	const isLevelLessThanRequired = useMemo(
		() => connectedUser?.profile?.level || -1 < event.levelRequired || false,
		[connectedUser, event],
	)

	const onRegisterEvent = () => {
		dispatch<any>(register(event))
		onClose()
	}

	return (
		<Container>
			<Grid container direction="column" rowSpacing={3}>
				<Grid item>
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
				</Grid>

				<Grid item padding={1} mb={1}>
					<DialogActions>
						<Button autoFocus onClick={() => onClose()}>
							Cancel
						</Button>
						<Button variant="contained" onClick={() => onRegisterEvent()}>
							Register
						</Button>
					</DialogActions>
				</Grid>
			</Grid>
		</Container>
	)
}

export default ConfirmRegisterEventForm
