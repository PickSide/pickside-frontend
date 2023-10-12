import { Activity, AppState } from '@state'
import Card, { CardBody, CardCTA, CardHeader, CardImage, CardProps } from './shared/Card'
import { FC, useMemo } from 'react'
import { useRegisterSelfToActivity, useUnregisterSelfFromActivity, useUpdateFavorite } from '@hooks'

import Button from './shared/Button'
import Icon from './shared/Icon'
import IconButton from './shared/IconButton'
import { cn } from '@utils'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps extends CardProps {
	activity: Activity
	size?: 'sm' | 'md' | 'lg'
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, className, ...rest }) => {
	const { unregisterFromActivity, isLoading: isUnregistering } = useUnregisterSelfFromActivity()
	const { registerToActivity, isLoading: isRegistering } = useRegisterSelfToActivity()
	const { updateFavorite } = useUpdateFavorite()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)

	const isFull = useMemo(() => activity.participants?.length === activity.maxPlayers, [activity])
	const isOrganiser = useMemo(() => activity.organiser?.id === connectedUser?.id, [activity, connectedUser])
	const isRegisteredToActivity = useMemo(
		() => activity.participants?.find((participant) => participant?.id === connectedUser?.id),
		[activity.participants, connectedUser],
	)

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
			className={cn(isFull ? 'bg-[#EAEAEA]' : '', selectedActivity?.id === activity.id ? 'shadow-md' : '', className)}
		>
			<div
				{...rest}
				className="flex flex-col gap-x-[21px]"
				onMouseEnter={rest.onMouseEnter}
				onMouseLeave={rest.onMouseLeave}
			>
				<div className="flex gap-8">
					<CardImage className="rounded-lg bg-red-300"></CardImage>
					<div className="block">
						<CardHeader className="inline-flex items-start">
							<div className="flex gap-x-2 mb-4">
								<Icon variant="filled" icon="account_circle" size="lg" />
								<div className="flex flex-col">
									<span className="text-lg font-semibold max-w-[70%] truncate">{activity.title}</span>
									<span className="text-sm">
										{t('Host')}: {activity.organiser?.username || activity.organiser?.fullName}
									</span>
								</div>
							</div>
						</CardHeader>
						<CardBody className="flex flex-col gap-y-3">
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="place" />
								<span className="underline max-w-[50%] truncate">
									{activity.address?.formatted_address || t('No address')}
								</span>
							</span>
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="schedule" />
								{dayjs(activity.date).toDate().toDateString()}
							</span>
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="group" />
								{activity.participants?.length}/{activity.maxPlayers}
							</span>
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="payments" />
								{activity.price === 0 ? t('Free') : activity.price + '$ ' + t('per person')}
							</span>
						</CardBody>
					</div>
				</div>
				<CardCTA className="flex flex-end z-20 ">
					<Button type="button" size="md" variant="secondary">
						{t('Details')}
					</Button>
					{connectedUser &&
						activity &&
						(isRegisteredToActivity ? (
							<Button
								type="button"
								size="sm"
								variant="primary"
								isLoading={isUnregistering}
								onClick={handleUnregister}
								disabled={isUnregistering}
							>
								{t('Uneregister')}
							</Button>
						) : isOrganiser ? (
							<Button type="button" size="sm" variant="primary">
								{t('Manage event')}
							</Button>
						) : (
							<Button
								type="button"
								size="md"
								variant="primary"
								isLoading={isRegistering}
								onClick={handleRegister}
								disabled={isFull || isRegistering}
							>
								{isFull ? t('Full') : t('Join')}
							</Button>
						))}
				</CardCTA>
			</div>
			<div className="absolute top-2 right-2 z-20">
				{connectedUser && (
					<div className="float-right">
						{connectedUser?.favorites?.includes(activity.id) ? (
							<IconButton icon={<Icon icon="bookmark" />} onClick={() => updateFavorite(activity.id)} />
						) : (
							<IconButton icon={<Icon icon="bookmark_border" />} onClick={() => updateFavorite(activity.id)} />
						)}
					</div>
				)}
			</div>
		</Card>
	)
}

export default ActivityCard
