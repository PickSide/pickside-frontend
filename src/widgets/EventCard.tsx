import { Activity, AppState, setSelectedActivity } from 'state'
import { BsBookmark, BsBookmarksFill, BsPeople } from 'react-icons/bs'
import { Button, Dialog, Gallery, IconButton } from 'components'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BiTime } from 'react-icons/bi'
import { ConfirmRegisterEventForm } from 'widgets'
import { FaLocationArrow } from 'react-icons/fa'
import dayjs from 'dayjs'
import placeholder from '../assets/avatar-placeholder.jpg'
import { useApi } from 'hooks'
import { useTranslation } from 'react-i18next'

interface ActivityProps {
	activity: Activity
}

const EventCard: FC<ActivityProps> = ({ activity }) => {
	const { updateFavorite } = useApi()
	const { t } = useTranslation()
	const dispatch = useDispatch()

	const connectedUser = useSelector((state: AppState) => state.user)

	const [openConfirmRegisterDialog, setOpenConfirmRegisterDialog] = useState<boolean>(false)

	return (
		<>
			<Dialog
				title={`${t('Register for')} ${activity.title}`}
				open={openConfirmRegisterDialog}
				onClose={() => setOpenConfirmRegisterDialog(false)}
			>
				<ConfirmRegisterEventForm
					id={activity.id}
					title={activity.title}
					isLevelLessThanRequired={false}
					onClose={() => setOpenConfirmRegisterDialog(false)}
				/>
			</Dialog>
			<div className="relative bg-white rounded-md shadow-md w-full flex flex-col m-2">
				{/* CARD HEADER */}
				<div className="block p-4">
					<div className="float-left align-middle">
						<div className="flex space-x-3 items-center">
							<div className="flex-1 rounded-full overflow-clip w-8 h-8">
								<img alt={`organiser-of-${activity.id}`} src={activity.organiser?.avatar || placeholder} />
							</div>
							<div className="flex flex-col">
								<p className="text-[18px] font-semibold">{t('Header')}</p>
								<p className="text-[14px] text-gray-400">{t('Subhead')}</p>
							</div>
						</div>
					</div>
					<div className="float-right">
						{connectedUser?.favorites?.includes(activity.id) ? (
							<IconButton
								icon={<BsBookmarksFill size={20} />}
								onClick={() => dispatch<any>(updateFavorite(activity.id))}
							/>
						) : (
							<IconButton icon={<BsBookmark size={20} />} onClick={() => dispatch<any>(updateFavorite(activity.id))} />
						)}
					</div>
				</div>
				{/* CARD BODY */}
				<div className="h-[200px]">
					<Gallery />
				</div>
				{/* CARD CONTENT */}
				<div className="p-4 space-y-1 grow-2">
					<div className="flex justify-between">
						<p className="text-[16px] font-normal">{activity.title}</p>
						<div className="flex items-center space-x-2">
							<p>
								{activity.participants.length}/{activity.maxPlayers}
							</p>
							<BsPeople size={15} className="text-gray-600" />
						</div>
					</div>
					<div className="flex items-center space-x-1">
						<BiTime size={15} className="text-gray-600" />
						<p className="text-[14px] font-normal text-gray-400">{dayjs(activity.date).toDate().toDateString()}</p>
					</div>
					<div className="flex items-center space-x-1">
						<FaLocationArrow size={15} className="text-gray-600" />
						<p className="text-[14px] font-normal text-gray-400 underline cursor-pointer max-w-[200px] hover:text-gray-700 truncate text-ellipsis">
							{activity.address.formatted_address || '420 Rue de la poitrie'}
						</p>
					</div>
					<div className="flex items-center">
						<p className="text-[14px] font-normal text-gray-400 mt-4">{activity.description || 'No Description'}</p>
					</div>
					<p></p>
				</div>
				{/* CARD FOOTER */}
				<div className="flex p-4 space-x-2 justify-end">
					<Button variant="secondary" text={t('Read More')} className="rounded-3xl" />
					<Button
						variant="primary"
						disabled={activity.participants.length >= activity.maxPlayers}
						text={activity.participants.length < activity.maxPlayers ? t('Join') : t('Full')}
						className="rounded-3xl"
					/>
				</div>
			</div>
		</>
	)
}

export default EventCard
