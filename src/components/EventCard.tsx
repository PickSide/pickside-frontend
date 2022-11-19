import React, { FC, useState, useMemo, useCallback } from 'react'
import { DirectionsRun, LocationOn, StarBorder, Star } from '@mui/icons-material'
import {
	Box,
	Button,
	Card as MuiCard,
	CardMedia as MuiCardMedia,
	CardActionArea as MuiCardActionArea,
	CardContent as MuiCardContent,
	Grid,
	Typography,
} from '@mui/material'
import { times } from 'lodash'
import { Activity } from 'state/activity'
import { MAX_LEVEL } from 'utils'

interface EventCardProps {
	event: Activity
}

const EventCard: React.ElementType<EventCardProps> = ({ event }) => {
	const combineAddress = useMemo(
		() => `${event.location?.streetName} ${event.location?.city} ${event.location?.zipCode}`,
		[event],
	)

	const Level = useCallback(() => {
		return (
			<Box component="span">
				{times(event.levelRequired, () => (
					<Star />
				))}
				{times(MAX_LEVEL - event.levelRequired, () => (
					<StarBorder />
				))}
			</Box>
		)
	}, [event])

	return (
		<MuiCard>
			<MuiCardMedia width={580} height={320} component="img" alt="placeholder" image="/monkey.jpeg" />
			<MuiCardContent>
				<Grid container>
					<Grid item container direction="column" xs={8} rowSpacing={3}>
						<Grid item>
							<Typography>
								<Level />
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h4">{event.title}</Typography>
						</Grid>
						<Grid item container columnSpacing={2}>
							<Grid item>
								<DirectionsRun />
							</Grid>
							<Grid item>
								<Typography>
									{event.registeredPlayers}/{event.maxPlayersCapacity}
								</Typography>
							</Grid>
						</Grid>
						<Grid item container columnSpacing={2}>
							<Grid item>
								<LocationOn />
							</Grid>
							<Grid item>
								<Typography>{combineAddress}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item container justifyContent="center" alignItems="center" xs={4}>
						<Button variant='contained' size='medium'>Register</Button>
					</Grid>
				</Grid>
			</MuiCardContent>
		</MuiCard>
	)
}

export default EventCard
