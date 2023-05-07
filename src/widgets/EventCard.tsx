import React, { FC, useState, useMemo, useCallback } from 'react'
import { EmojiEvents, DirectionsRun, LocationOn } from '@mui/icons-material'
import {
	Box,
	Button,
	Card as MuiCard,
	CardContent as MuiCardContent,
	IconButton,
	Grid,
	Link,
	Typography,
	Paper,
} from '@mui/material'
import { times } from 'lodash'

import { Dialog } from 'components'
import { ConfirmRegisterEventForm } from 'widgets'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { AppState } from 'state'
import { Activity } from 'state/activity'
import { setSelectedActivity } from 'state/selectedActivity'

const EventCard: React.ElementType<Activity> = ({
	id,
	title,
	participants,
	levelRequired,
	location,
	maxPlayersCapacity,
}) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const [openConfirmRegisterDialog, setOpenConfirmRegisterDialog] = useState<boolean>(false)
	const [expanded, setExpanded] = useState<boolean>(false)

	const account = useSelector((state: AppState) => state.account)
	const accountLevel = account?.profile?.level

	const Level = useCallback(() => {
		const level = levelRequired
		return (
			<Box component="span">
				{times(levelRequired, (idx) => (
					<EmojiEvents key={idx} color={level < 3 ? 'success' : level === 3 ? 'warning' : 'error'} />
				))}
			</Box>
		)
	}, [levelRequired])

	return (
		<>
			<Dialog
				title={`${t('Register for')} ${title}`}
				open={openConfirmRegisterDialog}
				onClose={() => setOpenConfirmRegisterDialog(false)}
			>
				<ConfirmRegisterEventForm
					id={id}
					title={title}
					isLevelLessThanRequired={(accountLevel || -1) < levelRequired}
					onClose={() => setOpenConfirmRegisterDialog(false)}
				/>
			</Dialog>
			<div className="relative">
				<Paper
					elevation={3}
					className={`relative w-full p-5 cursor-pointer h-fit`}
					onClick={() => dispatch<any>(setSelectedActivity(id))}
				>
					<div className="flex items-center justify-between">
						<div className="flex flex-col gap-y-2">
							<span className="text-[35px] font-semibold">{title}</span>
							<span>
								<Level />
							</span>
							<span className="text-[25px] font-normal">
								{participants?.length}/{maxPlayersCapacity} players registered
							</span>
							<span className="text-[15px] font-normal">{location}</span>
							{expanded && (
								<>
									<span className="text-[25px] font-normal">
										{participants?.length}/{maxPlayersCapacity} players registered
									</span>
									<span className="text-[15px] font-normal">{location}</span>
									<span className="text-[25px] font-normal">
										{participants?.length}/{maxPlayersCapacity} players registered
									</span>
									<span className="text-[15px] font-normal">{location}</span>
									<span className="text-[25px] font-normal">
										{participants?.length}/{maxPlayersCapacity} players registered
									</span>
									<span className="text-[15px] font-normal">{location}</span>
								</>
							)}
						</div>
					</div>
				</Paper>
				<button
					disabled={!account}
					onClick={() => setOpenConfirmRegisterDialog(true)}
					className={`absolute right-6 top-1/2 -translate-y-1/4 ${!account ? 'btn-disabled' : 'btn'}`}
				>
					<span>{t('Register')}</span>
				</button>
				<IconButton onClick={() => setExpanded(!expanded)} className={`absolute bottom-2 right-6`}>
					{expanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
				</IconButton>
			</div>
			{/* <MuiCard>
				<MuiCardContent>
					<Grid container>
						<Grid item container direction="column" xs={8} rowSpacing={3}>
							<Grid item>
								<Typography variant="h4">{title}</Typography>
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
										{participants?.length}/{maxPlayersCapacity}
									</Typography>
								</Grid>
							</Grid>
							<Grid item container columnSpacing={2}>
								<Grid item>
									<LocationOn />
								</Grid>
								<Grid item>
									<Link href="#" underline="hover" onClick={() => dispatch<any>(setSelectedActivity(id))}>
										<Typography>{location}</Typography>
									</Link>
								</Grid>
							</Grid>
						</Grid>
						<Grid item container justifyContent="center" alignItems="center" xs={4}>
							<Button
								variant="contained"
								size="medium"
								disabled={!account}
								onClick={() => setOpenConfirmRegisterDialog(true)}
							>
								{t('Register')}
							</Button>
						</Grid>
					</Grid>
				</MuiCardContent>
			</MuiCard> */}
		</>
	)
}

export default EventCard
