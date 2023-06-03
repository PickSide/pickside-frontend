import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Dialog } from 'components'
import { EventCard, RegisterEventForm } from 'widgets'
import { AppState } from 'state'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const [openCreateNewEventDialog, setOpenCreateNewEventDialog] = useState<boolean>(false)
	const activities = useSelector((state: AppState) => state.activities)
	const navigate = useNavigate()
	const account = useSelector((state: AppState) => state.account)
	const playables = useSelector((state: AppState) => state.playables)

	return activities?.results ? (
		<>
			<Dialog
				title={t('Create a new event')}
				open={openCreateNewEventDialog}
				onClose={() => setOpenCreateNewEventDialog(false)}
			>
				<RegisterEventForm onClose={() => setOpenCreateNewEventDialog(false)} />
			</Dialog>

			<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto">
				<div className="flex flex-row-reverse">
					<Button isLink onClick={() => setOpenCreateNewEventDialog(true)} className="h-[50px]">
						{t('New event')}
					</Button>
				</div>
				<div className="flex flex-col gap-y-5">
					{activities?.results?.map((activity, idx) => (
						<EventCard key={idx} activity={activity} />
					))}
				</div>
			</div>
		</>
	) : (
		<div className="flex justify-center items-center">
			<span className="text-[35px] font-semibold">{t('No events in the area')}</span>
		</div>
	)
}

export default memo(EventList)
