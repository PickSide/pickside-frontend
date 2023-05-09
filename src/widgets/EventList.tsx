import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { Button, Dialog } from 'components'
import { EventCard, RegisterEventForm } from 'widgets'
import { AppState } from 'state'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const [openCreateNewEventDialog, setOpenCreateNewEventDialog] = useState<boolean>(false)
	const activities = useSelector((state: AppState) => state.activities)
	const account = useSelector((state: AppState) => state.account)
	const playables = useSelector((state: AppState) => state.playables)

	return activities?.results ? (
		<>
			<Dialog
				title={t('Create a new event')}
				open={openCreateNewEventDialog}
				onClose={() => setOpenCreateNewEventDialog(false)}
				size="sm"
			>
				<RegisterEventForm onClose={() => setOpenCreateNewEventDialog(false)} />
			</Dialog>

			<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3">
				<div className="flex flex-row-reverse">
					<Button onClick={() => setOpenCreateNewEventDialog(true)}>{t('New event')}</Button>
				</div>
				<div className="flex flex-col overflow-y-auto gap-y-5">
					{activities?.results?.map((activity, idx) => (
						<EventCard key={idx} activity={activity} />
					))}
				</div>
			</div>
		</>
	) : (
		<Box justifyContent="center" alignContent="center">
			<Typography variant="headerSmall">{t('No events in the area')}</Typography>
		</Box>
	)
}

export default memo(EventList)
