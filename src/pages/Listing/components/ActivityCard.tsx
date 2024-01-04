import { Activity, AppState } from '@state'
import Card, { CardBody, CardCTA, CardImage, CardProps } from '../../../components/shared/Card'
import Dialog, { DialogCTA } from '../../../components/Dialog'
import { FC, useState } from 'react'

import { ACCOUNT_TYPE } from '@state/user/constants'
import Avatar from '../../../components/Avatar'
import Button from '../../../components/shared/Button'
import Icon from '../../../components/shared/Icon'
import IconButton from '../../../components/IconButton'
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
		isFavorite,
		isFull,
		isRegistering,
		isUnregistering,
		isRegisteredToActivity,
		registerToActivity,
		unregisterFromActivity,
		updateFavorite,
	} = useActivityHandlers(activity)

	const connectedUser = useSelector((state: AppState) => state.user)
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)

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
					<Button onClick={handleRegister}>{t('Register')}</Button>
				</DialogCTA>
			</Dialog>
			<Card
				className={cn(
					'flex px-[20px] py-[17px] gap-x-[28px]',
					isFull ? 'bg-[#EAEAEA]' : '',
					selectedActivity?.id === activity.id ? 'shadow-md' : '',
				)}
				onMouseEnter={rest.onMouseEnter}
				onMouseLeave={rest.onMouseLeave}
				{...rest}
			>
				<CardImage className="rounded-[5px] min-w-[150px] max-h-[200px] p-0 ">
					<img className="w-full h-full bg-card-placeholder bg-cover bg-no-repeat" src="" alt="" />
				</CardImage>
				<CardBody className="flex flex-col p-0 overflow-hidden w-full">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-x-2">
							<Avatar size="md" src={activity.organizer?.avatar} />
							<div className="flex flex-col">
								<span className="text-base font-bold max-w-[90px]">{activity.title}</span>
								<span className="font-medium">
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
					<div className="block w-fit space-y-2 ml-[10px] pt-6 pb-3 truncate">
						<div className="flex items-center gap-x-[10px] ">
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
					<CardCTA className="p-0 w-full">
						<div className="flex justify-end items-center gap-x-2">
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
				</CardBody>
			</Card>
		</>
	)
}

export default ActivityCard
