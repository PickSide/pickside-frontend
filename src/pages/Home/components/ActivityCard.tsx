import { Card, CardBody, Icon } from '@components'
import { CardImage, CardProps } from '@components/shared/Card'

import { Activity } from '@state'
import Avatar from '@components/Avatar'
import { FC } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps extends CardProps {
	activity: Activity
}

const ActivityCard: FC<ActivityCardProps> = ({ activity }) => {
	const { t } = useTranslation()

	return activity ? (
		<>
			<Card className="flex flex-col w-[400px] h-[462px]">
				<CardImage className="h-[258px]">
					<img className="w-full h-full bg-card-placeholder bg-contain" src="" alt="" />
				</CardImage>
				<CardBody className="flex flex-col flex-grow-2 justify-center relative px-5 h-fit text-charcoal-black text-sm">
					<div className="absolute -top-[24px] left-0 space-x-2">
						<Avatar
							className="border-2 border-ocean-1"
							variant="secondary"
							size="lg"
							src={activity.organizer?.avatar}
						/>
						<span className="absolute top-1/2">{activity.organizer?.displayName}</span>
					</div>
					<div className="block w-full space-y-2 truncate">
						<div className="flex items-center gap-x-[10px]">
							<span className="text-base">{activity.title}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className="text-cool-gray-3" icon="location_on" />
							<span>{activity.address}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className="text-cool-gray-3" icon="schedule" />
							<span>{dayjs(activity.date).toDate().toDateString()}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className="text-cool-gray-3" icon="group" />
							<span>
								{activity.participants?.length || 0}/{activity.maxPlayers}
							</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className="text-cool-gray-3" icon="payments" />
							<span>
								{activity.price}$&nbsp;{t('per person')}
							</span>
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	) : null
}

export default ActivityCard
