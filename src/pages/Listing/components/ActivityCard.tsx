import { Activity, AppState } from '@state'
import Card, { CardBody, CardCTA, CardImage, CardProps } from '@components/shared/Card'
import Dialog, { DialogCTA } from '@components/Dialog'
import { FC, useMemo, useState } from 'react'

import ActivityDetailsDialog from './Dialogs/ActivityDetailsDialog'
import Avatar from '@components/Avatar'
import Button from '@components/shared/Button'
import Icon from '@components/shared/Icon'
import Image from '@components/Image'
import { cn } from '@utils'
import moment from 'moment'
import { useActivityHandlers } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps extends CardProps {
	activity: Activity
	size?: 'sm' | 'md' | 'lg'
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, className, onClick, ...rest }) => {
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
	const isMeOrganizer = me !== undefined && organizer !== undefined && me?.id === organizer?.id

	const date = moment(activity.date)
	const startTime = moment(activity.startTime)

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
						className="px-4"
						isLoading={isDeletingActivity}
						onClick={(e) => {
							e.stopPropagation()
							setOpenDeleteActivity(true)
						}}
						disabled={isFull || isRegistering || isDeletingActivity}
					>
						{t('Delete')}
					</Button>
				</DialogCTA>
			)
		}
		if (!!me) {
			return (
				<DialogCTA>
					<Button
						size="sm"
						className="px-4"
						isLoading={isRegistering}
						onClick={(e) => {
							e.stopPropagation()
							setOpen(true)
						}}
						disabled={isFull || isRegistering || isDeletingActivity}
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
				<p className="font-medium">{t('Read the rules before joining.')}</p>
				<p>{activity.rules}</p>
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
				fullWidth
				onMouseEnter={rest.onMouseEnter}
				onMouseLeave={rest.onMouseLeave}
				onClick={() => setOpenActivtyDetail(true)}
				{...rest}
			>
				<CardImage className="block">
					{activity.images?.length ? <Image src={activity.images[0]} /> : <Image />}
				</CardImage>
				<CardBody className="flex flex-col p-0 overflow-hidden w-full text-base">
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
							{activity.gmapsUrl ? (
								<a className="link" href={activity.gmapsUrl} target="_blank" rel="noreferrer">
									{activity.address}
								</a>
							) : (
								activity.address
							)}
						</span>
						<span className="flex items-center gap-x-2">
							<Icon icon="schedule" />
							<p>{date.format('MMM Do')}</p>
							<p>at</p>
							<p className="uppercase">{startTime.format('hh:mm a')}</p>
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
