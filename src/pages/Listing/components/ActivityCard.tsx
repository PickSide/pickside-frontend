import { Activity, AppState } from '@state'
import Card, { CardBody, CardCTA, CardImage, CardProps } from '@components/shared/Card'
import Dialog, { DialogCTA } from '@components/Dialog'
import { FC, useMemo, useState } from 'react'

import ActivityDetailsDialog from './Dialogs/ActivityDetailsDialog'
import Avatar from '@components/Avatar'
import Button from '@components/shared/Button'
import Icon from '@components/shared/Icon'
import { cn } from '@utils'
import dayjs from 'dayjs'
import { useActivityHandlers } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps extends CardProps {
	activity: Activity
	size?: 'sm' | 'md' | 'lg'
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, className, ...rest }) => {
	const { t } = useTranslation()
	const {
		isFull,
		isDeletingActivity,
		isRegistering,
		isRegisteredToActivity,
		deleteActivity,
		registerToActivity,
		registeredCount,
	} = useActivityHandlers(activity)

	const me = useSelector((state: AppState) => state.user)
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)

	const [open, setOpen] = useState<boolean>(false)
	const [openDeleteActivity, setOpenDeleteActivity] = useState<boolean>(false)
	const [openActivtyDetail, setOpenActivtyDetail] = useState<boolean>(false)

	const organizer = useMemo(() => activity?.participants?.find((p) => p.isOrganizer), [activity])
	const isMeOrganizer = me?.id === organizer?.id

	const handleRegister = async (e) => {
		e.stopPropagation()
		if (activity.id) {
			await registerToActivity(activity.id)
		}
		setOpen(false)
	}

	const handleDelete = async (e) => {
		e.stopPropagation()
		if (activity.id) {
			await deleteActivity(activity.id)
		}
		setOpenDeleteActivity(false)
	}

	const btnText = useMemo(() => {
		if (isRegisteredToActivity) {
			return t('Unregister')
		} else if (!isFull) {
			return t('Join')
		} else {
			return t('Full')
		}
	}, [isFull, isRegisteredToActivity, t])

	const ActivityCTA = () => {
		if (isMeOrganizer) {
			return (
				<DialogCTA>
					<Button
						size="sm"
						variant="danger"
						className="px-4 rounded-[12px] font-semibold"
						isLoading={isDeletingActivity}
						onClick={(e) => {
							e.stopPropagation()
							setOpenDeleteActivity(true)
						}}
						disabled={isFull || isRegistering}
					>
						{t('Remove')}
					</Button>
				</DialogCTA>
			)
		}
		if (!!me) {
			return (
				<DialogCTA>
					<Button
						size="sm"
						className="px-4 rounded-[12px] font-semibold"
						isLoading={isDeletingActivity}
						onClick={(e) => {
							e.stopPropagation()
							setOpen(true)
						}}
						disabled={isMeOrganizer}
					>
						{btnText}
					</Button>
				</DialogCTA>
			)
		}
		return null
	}

	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)} title={t('Confirm event registration')}>
				<p>{t('Before registering, you need to understand some rules.')}</p>
				<DialogCTA>
					<Button variant="tertiary" onClick={(e) => setOpen(false)}>
						{t('Cancel')}
					</Button>
					<Button onClick={handleRegister}>{btnText}</Button>
				</DialogCTA>
			</Dialog>
			<Dialog
				open={openDeleteActivity}
				onClose={() => setOpenDeleteActivity(false)}
				title={t('Confirm event deletion')}
			>
				<p>{t('Deleting this activity will cancel the event for all players. Are you sure you want to continue?')}</p>
				<DialogCTA>
					<Button variant="tertiary" onClick={(e) => setOpenDeleteActivity(false)}>
						{t('Cancel')}
					</Button>
					<Button variant="danger" onClick={handleDelete}>
						{t('Remove')}
					</Button>
				</DialogCTA>
			</Dialog>
			<Dialog open={openActivtyDetail} onClose={() => setOpenActivtyDetail(false)} title={activity.title}>
				<ActivityDetailsDialog activity={activity} />
				<ActivityCTA />
			</Dialog>
			<Card
				className={cn(
					'flex px-[20px] py-[17px] gap-x-[28px]',
					isFull ? 'bg-[#EAEAEA]' : '',
					selectedActivity?.id === activity.id ? 'shadow-md' : '',
					className,
				)}
				onMouseEnter={rest.onMouseEnter}
				onMouseLeave={rest.onMouseLeave}
				onClick={() => setOpenActivtyDetail(true)}
				{...rest}
			>
				<CardImage className="rounded-[5px] min-w-[150px] max-h-[200px] p-0 ">
					{activity.images?.length ? (
						<img className="w-full h-full bg-card-placeholder bg-cover bg-no-repeat" src={activity.images[0]} alt="" />
					) : (
						<img className="w-full h-full bg-card-placeholder bg-cover bg-no-repeat" src="" alt="" />
					)}
				</CardImage>
				<CardBody className="flex flex-col p-0 overflow-hidden w-full">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-2">
							<Avatar size="md" src={organizer?.avatar} />
							<div className="flex flex-col">
								<span className="text-base font-bold max-w-[90px] truncate">{activity.title}</span>
								<span className="font-medium">
									{t('Host')}:&nbsp;{organizer?.fullName || t('No organizer')}
								</span>
							</div>
						</div>
					</div>
					<div className="block w-fit space-y-2 mt-3 truncate">
						<span className="flex items-center gap-x-2">
							<Icon icon="location_on" />
							{activity.address}
						</span>
						<span className="flex items-center gap-x-2">
							<Icon icon="schedule" />
							{dayjs(activity.date).toDate().toDateString()}
						</span>
						<span className="flex items-center gap-x-2">
							<Icon icon="group" />
							{registeredCount}/{activity.maxPlayers}
						</span>
						<span className="flex items-center gap-x-2">
							<Icon icon="payments" />
							{!activity.price ? t('Free') : `${activity.price}$ ${t('per person')}`}
						</span>
					</div>
					<CardCTA className="p-0 w-full">
						<div className="flex justify-end items-center gap-x-2">
							<ActivityCTA />
						</div>
					</CardCTA>
				</CardBody>
			</Card>
		</>
	)
}

export default ActivityCard
