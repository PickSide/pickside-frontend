import React, { FC, useState, useMemo, useCallback } from 'react'
import { EmojiEvents, DirectionsRun, LocationOn } from '@mui/icons-material'
import { Box, Button, Card as MuiCard, CardContent as MuiCardContent, Grid, Link, Typography } from '@mui/material'
import { times } from 'lodash'

import { Dialog } from 'components'
import { ConfirmRegisterEventForm } from 'widgets'
import { SportEvent } from 'state/sportEvent'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AppState } from 'state'

interface EventCardProps {
	event: SportEvent
}

const EventCard: React.ElementType<EventCardProps> = ({ event }) => {
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.account)

	const [openConfirmRegisterDialog, setOpenConfirmRegisterDialog] = useState<boolean>(false)

	const disableEvent = useMemo(
		() => !connectedUser || event.participants?.includes(connectedUser.id!),
		[connectedUser, event],
	)

	const combineAddress = useMemo(
		() => `${event.location?.streetName} ${event.location?.city} ${event.location?.zipCode}`,
		[event],
	)

	const Level = useCallback(() => {
		const level = event.levelRequired
		return (
			<Box component="span">
				{times(event.levelRequired, (idx) => (
					<EmojiEvents key={idx} color={level < 3 ? 'success' : level === 3 ? 'warning' : 'error'} />
				))}
			</Box>
		)
	}, [event.levelRequired])

	return (
		<>
			<Dialog
				title={`${t('Register for')} ${event.title}`}
				open={openConfirmRegisterDialog}
				onClose={() => setOpenConfirmRegisterDialog(false)}
			>
				<ConfirmRegisterEventForm event={event} onClose={() => setOpenConfirmRegisterDialog(false)} />
			</Dialog>
			<MuiCard>
				<MuiCardContent>
					<Grid container>
						<Grid item container direction="column" xs={8} rowSpacing={3}>
							<Grid item>
								<Typography variant="h4">{event.title}</Typography>
							</Grid>
							<Grid item>
								<Typography>
									<Level />
								</Typography>
							</Grid>
							<Grid item container columnSpacing={2}>
								<Grid item>
									<DirectionsRun />
								</Grid>
								<Grid item>
									<Typography>
										{event.participants?.length}/{event.maxPlayersCapacity}
									</Typography>
								</Grid>
							</Grid>
							<Grid item container columnSpacing={2}>
								<Grid item>
									<LocationOn />
								</Grid>
								<Grid item>
									<Link
										href="#"
										underline="hover"
										//onClick={() => dispatch(setSelectedMarker(currentMarkerActivity?.activityId))}
									>
										<Typography>{combineAddress}</Typography>
									</Link>
								</Grid>
							</Grid>
						</Grid>
						<Grid item container justifyContent="center" alignItems="center" xs={4}>
							<Button
								variant="contained"
								size="medium"
								disabled={disableEvent}
								onClick={() => setOpenConfirmRegisterDialog(true)}
							>
								{t('Register')}
							</Button>
						</Grid>
					</Grid>
				</MuiCardContent>
			</MuiCard>
		</>
	)
}

export default EventCard
