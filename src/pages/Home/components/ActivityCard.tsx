import { Activity, AppState } from '@state'
import { Button, Card, CardBody, CardCTA, CardHeader, Dialog, DialogCTA, Icon, IconButton } from '@components'
import { CardImage, CardProps } from '@components/shared/Card'
import { FC, useState } from 'react'

import { ACCOUNT_TYPE } from '@state/user/constants'
import Avatar from '@components/Avatar'
import { cn } from '@utils'
import dayjs from 'dayjs'
import { useActivityHandlers } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps extends CardProps {
	activity: Activity
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, className, ...rest }) => {
	const { t } = useTranslation()
	const {
		isFavorite,
		isFull,
		isOrganizer,
		isRegistering,
		isUnregistering,
		isRegisteredToActivity,
		registerToActivity,
		unregisterFromActivity,
		updateFavorite,
	} = useActivityHandlers(activity)

	const connectedUser = useSelector((state: AppState) => state.user)

	const [open, setOpen] = useState<boolean>(false)

	const handleRegister = async (e) => {
		e.stopPropagation()
		await registerToActivity(activity.id)
		setOpen(false)
	}
	const handleUnregister = async (e) => {
		e.stopPropagation()
		await unregisterFromActivity(activity.id)
	}

	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)} title={t('Confirm event registration')}>
				<p>{t('Before registering, you need to understand some rules.')}</p>
				<DialogCTA>
					<Button variant="tertiary" onClick={() => setOpen(false)}>
						{t('Cancel')}
					</Button>
					<Button isLoading={isRegistering} onClick={handleRegister}>
						{t('Register')}
					</Button>
				</DialogCTA>
			</Dialog>
			<Card className={cn(className)}>
				<CardHeader className="px-5">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Avatar variant="secondary" src={activity.organizer?.avatar} />
							<div className="flex flex-col ml-2">
								<span className="text-md font-bold">{activity.title}</span>
								<span>
									{t('Host')}:&nbsp;{activity.organizer?.fullName}
								</span>
							</div>
						</div>
						{connectedUser && connectedUser.accountType !== ACCOUNT_TYPE.GUEST && (
							<IconButton onClick={() => updateFavorite(activity.id)}>
								{isFavorite ? <Icon icon="bookmark" /> : <Icon icon="bookmark_border" />}
							</IconButton>
						)}
					</div>
				</CardHeader>
				<CardImage className="px-0">
					<img className="w-full h-[200px] bg-card-placeholder bg-contain" src="" alt="" />
				</CardImage>
				<CardBody className="px-5 text-charcoal-black">
					<div className="block w-full space-y-2">
						<div className="flex items-center gap-x-[10px]">
							<Icon icon="location_on" />
							<span>{activity.address?.formatted_address}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon icon="schedule" />
							<span>{dayjs(activity.date).toDate().toDateString()}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon icon="group" />
							<span>
								{activity.participants?.length}/{activity.maxPlayers}
							</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon icon="payments" />
							<span>
								{activity.price}$&nbsp;{t('per person')}
							</span>
						</div>
					</div>
				</CardBody>
				<CardCTA className="px-5">
					<div className="flex justify-end items-center gap-x-2">
						<Button size="sm" variant="secondary" className="px-4 rounded-[12px] font-semibold">
							{t('Details')}
						</Button>
						{connectedUser &&
							connectedUser.accountType !== ACCOUNT_TYPE.GUEST &&
							activity &&
							(isRegisteredToActivity ? (
								<Button
									size="sm"
									className="px-4 rounded-[12px] font-semibold"
									isLoading={isUnregistering}
									onClick={handleUnregister}
									disabled={isUnregistering}
								>
									{t('Uneregister')}
								</Button>
							) : isOrganizer ? (
								<Button size="sm" className="px-4 rounded-[12px] font-semibold">
									{t('Manage event')}
								</Button>
							) : (
								<Button
									size="sm"
									className="px-4 rounded-[12px] font-semibold"
									isLoading={isRegistering}
									onClick={() => setOpen(true)}
									disabled={isFull || isRegistering}
								>
									{isFull ? t('Full') : t('Join')}
								</Button>
							))}
					</div>
				</CardCTA>
			</Card>
		</>
	)
}

export default ActivityCard
