import { Activity, AppState } from '@state'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import Card, { CardBody, CardCTA, CardHeader, CardImage } from './shared/Card'
import { FC, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from './shared/Button'
import Icon from './Icon'
import IconButton from './shared/IconButton'
import { cn } from '@utils'
import dayjs from 'dayjs'
import { useApi } from '@hooks'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps {
	activity: Activity
	size?: 'sm' | 'md' | 'lg'
}

const ActivityCard: FC<ActivityCardProps> = ({ activity }) => {
	const { registerSelfToActivity, unregisterSelfFromActivity, updateFavorite } = useApi()
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.user)

	const [isRegistering, setIsRegistering] = useState<boolean>(false)
	const [isUnregistering, setIsUnregistering] = useState<boolean>(false)

	const isFull = useMemo(() => activity.participants.length === activity.maxPlayers, [activity])

	const handleRegister = async () => {
		setIsRegistering(true)
		await dispatch<any>(registerSelfToActivity(activity.id))
		setIsRegistering(false)
	}

	const handleUnregister = async () => {
		setIsUnregistering(true)
		await dispatch<any>(unregisterSelfFromActivity(activity.id))
		setIsUnregistering(false)
	}

	return (
		<Card className={cn(isFull ? 'bg-[#EAEAEA]' : '')}>
			<div className="flex flex-col gap-x-[21px]">
				<div className="flex gap-8">
					<CardImage className="rounded-lg bg-red-300"></CardImage>
					<div className="block">
						<CardHeader className="inline-flex items-start">
							<div className="flex gap-x-2 mb-4">
								<Icon icon="account_circle" size="lg" />
								<div className="flex flex-col">
									<span className="text-lg font-semibold max-w-[70%] truncate">{activity.title}</span>
									<span className="text-sm">
										{t('Host')}: {activity.organiser.username || activity.organiser.fullName}
									</span>
								</div>
							</div>
						</CardHeader>
						<CardBody className="flex flex-col gap-y-3">
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="place" />
								<span className="underline max-w-[50%] truncate">
									{activity.address.formatted_address || t('No address')}
								</span>
							</span>
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="schedule" />
								{dayjs(activity.date).toDate().toDateString()}
							</span>
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="group" />
								{activity.participants.length}/{activity.maxPlayers}
							</span>
							<span className="inline-flex gap-x-4 text-base">
								<Icon icon="payments" />
								{activity.price}$ &nbsp;
								{t('per person')}
							</span>
						</CardBody>
					</div>
				</div>
				<CardCTA className="flex flex-end">
					<Button type="button" size="sm" variant="tertiary">
						{t('Details')}
					</Button>
					{connectedUser &&
						activity &&
						(activity.participants?.find((participant) => participant.id === connectedUser.id) ? (
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
						) : activity.organiser.id === connectedUser.id ? (
							<Button type="button" size="sm" variant="primary">
								{t('Manage event')}
							</Button>
						) : (
							<Button
								type="button"
								size="sm"
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
			<div className="absolute top-2 right-2">
				{connectedUser && (
					<div className="float-right">
						{connectedUser?.favorites?.includes(activity.id) ? (
							<IconButton
								icon={<BsBookmarkFill size={20} />}
								onClick={() => dispatch<any>(updateFavorite(activity.id))}
							/>
						) : (
							<IconButton icon={<BsBookmark size={20} />} onClick={() => dispatch<any>(updateFavorite(activity.id))} />
						)}
					</div>
				)}
			</div>
		</Card>
	)
}

export default ActivityCard
