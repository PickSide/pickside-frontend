import { FC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Select } from 'components'
import { EventCard, RegisterEventForm } from 'widgets'
import { AppState } from 'state'
import { useLocalStorage } from 'hooks'

const EventList: FC<any> = () => {
	const { t } = useTranslation()
	const { get, set } = useLocalStorage()
	const [openCreateNewEventDialog, setOpenCreateNewEventDialog] = useState<boolean>(false)
	const [sport, setSport] = useState<string>()
	const activities = useSelector((state: AppState) => state.activities)
	const sports = useSelector((state: AppState) => state.sports)
	const navigate = useNavigate()

	return activities?.results ? (
		<>
			{/* <Dialog
				title={t('Create a new event')}
				open={openCreateNewEventDialog}
				onClose={() => setOpenCreateNewEventDialog(false)}
				className='md:min-w-1/2 h-fit'
			>
				<RegisterEventForm onClose={() => setOpenCreateNewEventDialog(false)} />
			</Dialog> */}

			<div className="flex flex-col bg-[#fafafa] min-w-[500px] h-[calc(100vh-64px)] py-2 px-4 gap-y-3 overflow-y-auto">
				<div className="flex flex-row-reverse z-50">
					<Button
						tertiary
						disabled={!get('sportPreference')}
						onClick={() => navigate('/new-event')}
						className="h-[50px]"
					>
						{t('New event')}
					</Button>
					<Select
						value={get('sportPreference')}
						placeholder={t('Select sport')}
						options={sports?.results}
						getOptionLabel={(option) => option?.name}
						getOptionDisabled={(option) => !option?.featureAvailable}
						onChange={(value) => set('sportPreference', value)}
						fullWidth
					/>
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
