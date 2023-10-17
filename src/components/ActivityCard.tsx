import { Activity, AppState } from '@state'
import Card, { CardBody, CardCTA, CardImage, CardProps } from './shared/Card'

import Button from './shared/Button'
import { FC } from 'react'
import Icon from './shared/Icon'
import IconButton from './shared/IconButton'
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
		isOrganiser,
		isRegistering,
		isUnregistering,
		isRegisteredToActivity,
		registerToActivity,
		unregisterFromActivity,
		updateFavorite,
	} = useActivityHandlers(activity)

	const connectedUser = useSelector((state: AppState) => state.user)
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)

	const handleRegister = async (e) => {
		e.stopPropagation()
		await registerToActivity(activity.id)
	}
	const handleUnregister = async (e) => {
		e.stopPropagation()
		await unregisterFromActivity(activity.id)
	}
	return (
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
						<div className="w-8 h-8 flex justify-center items-center rounded-full bg-primary">
							{activity.organiser?.avatar ? (
								<img className="rounded-full" src={activity.organiser.avatar} alt="" />
							) : (
								<svg width="16" height="16" viewBox="0 0 24 24" fill="primary" xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M4.49579 23.3299C4.45167 23.7418 4.08202 24.0399 3.67016 23.9957C3.25831 23.9516 2.9602 23.582 3.00433 23.1701C3.50157 18.5292 7.32488 15 12.0001 15C16.6752 15 20.4986 18.5292 20.9958 23.1701C21.0399 23.582 20.7418 23.9516 20.33 23.9957C19.9181 24.0399 19.5485 23.7418 19.5043 23.3299C19.0878 19.4427 15.8999 16.5 12.0001 16.5C8.10025 16.5 4.91228 19.4427 4.49579 23.3299ZM12.0001 13.5C8.68635 13.5 6.00006 10.8137 6.00006 7.5C6.00006 4.18629 8.68635 1.5 12.0001 1.5C15.3138 1.5 18.0001 4.18629 18.0001 7.5C18.0001 10.8137 15.3138 13.5 12.0001 13.5ZM12.0001 12C14.4853 12 16.5001 9.98528 16.5001 7.5C16.5001 5.01472 14.4853 3 12.0001 3C9.51478 3 7.50006 5.01472 7.50006 7.5C7.50006 9.98528 9.51478 12 12.0001 12Z"
										fill="white"
									/>
								</svg>
							)}
						</div>
						<div className="flex flex-col">
							<span className="text-base font-bold max-w-[90px]">{activity.title}</span>
							<span className="font-medium">
								{t('Host')}:&nbsp;{activity.organiser?.fullName}
							</span>
						</div>
					</div>
					{connectedUser && (
						<IconButton
							icon={isFavorite ? <Icon icon="bookmark" /> : <Icon icon="bookmark_border" />}
							onClick={() => updateFavorite(activity.id)}
						/>
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
						<Button size="sm" variant="secondary" className="px-4 rounded-[12px] font-semibold">
							{t('Details')}
						</Button>
						{connectedUser &&
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
							) : isOrganiser ? (
								<Button size="sm" className="px-4 rounded-[12px] font-semibold">
									{t('Manage event')}
								</Button>
							) : (
								<Button
									size="sm"
									className="px-4 rounded-[12px] font-semibold"
									isLoading={isRegistering}
									onClick={handleRegister}
									disabled={isFull || isRegistering}
								>
									{isFull ? t('Full') : t('Join')}
								</Button>
							))}
					</div>
				</CardCTA>
			</CardBody>
		</Card>
	)
}

export default ActivityCard
