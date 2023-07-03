import { Activity, AppState, setSelectedActivity } from 'state'
import { Button, Dialog } from 'components'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ConfirmRegisterEventForm } from 'widgets'
import { useTranslation } from 'react-i18next'

interface ActivityProps {
	activity: Activity
}

const EventCard: FC<ActivityProps> = ({ activity }) => {
	const { id, title, participants, price, playTime, time, level, location, players } = activity

	const { t } = useTranslation()
	const dispatch = useDispatch()

	const [openConfirmRegisterDialog, setOpenConfirmRegisterDialog] = useState<boolean>(false)
	const [expanded, setExpanded] = useState<boolean>(false)

	const user = useSelector((state: AppState) => state.user)

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
					isLevelLessThanRequired={false}
					onClose={() => setOpenConfirmRegisterDialog(false)}
				/>
			</Dialog>
			<div
				onClick={() => dispatch<any>(setSelectedActivity(id))}
				className="relative bg-white rounded-md shadow-md w-full flex flex-col p-4"
			>
				<div className="flex flex-col items-center mb-7">
					<span className="text-[25px] font-semibold">{title}</span>
				</div>
				<div className="m-auto grid grid-cols-3 gap-12 gap-y-6 text-[15px] text-center h-[120px]">
					<div>
						<span className="capitalize font-semibold flex flex-col items-center">
							{(participants || []).length} / {players}
						</span>
						<span>{t('Players')}</span>
					</div>
					<div>
						{/* <span className="capitalize font-semibold flex flex-col items-center">
							{settings.clothingColor.join(',')}
						</span> */}
						<span>{t('Clothing color')}</span>
					</div>
					<div>
						<span className="font-semibold flex flex-col items-center uppercase">
							{price === 0 ? 'Free' : `${price}$`}
						</span>
						<span>{t('Price')}</span>
					</div>
					<div>
						<span className="font-semibold flex flex-col items-center">{level}</span>
						<span>{t('Level')}</span>
					</div>
					<div>
						<span className="font-semibold flex flex-col items-center">{playTime + 1}</span>
						<span>{t('Play time')}</span>
					</div>
					<div className=" flex flex-col items-center justify-center">
						<Button variant="tertiary" text={t('Show on map')} />
					</div>
					{/* <div className="flex flex-col items-center">
						{settings.isBallProvided ? (
							<span className="text-[#2bb75c]">
								<BsCheckCircleFill size={20} />
							</span>
						) : (
							<span className="text-[#d2333d]">
								<BsXCircleFill size={20} />
							</span>
						)}
						<span>{t('Ball')}</span>
					</div> */}
				</div>
				<div className="flex justify-center">
					{/* <IconButton onClick={() => setExpanded(!expanded)} disableRipple>
						<div className="inline-flex items-center gap-x-1">
							{expanded ? (
								<>
									<span className="text-[15px] font-normal">{t('Show less')}</span>
									<MdExpandLess size={20} />
								</>
							) : (
								<>
									<span className="text-[15px] font-normal">{t('Show more')}</span>
									<MdExpandMore size={20} />
								</>
							)}
						</div>
					</IconButton> */}
				</div>
			</div>
		</>
	)
}

export default EventCard
