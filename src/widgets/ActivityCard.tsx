import { Activity, AppState } from '@state'
import { BsBookmark, BsBookmarkFill, BsPeople } from 'react-icons/bs'
import { Button, Card, CardBody, CardCTA, CardHeader, CardImage, IconButton } from '@components'
import { FC, useState } from 'react'
import { MdOutlineLocationOn, MdOutlinePriceChange } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { BiTime } from 'react-icons/bi'
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
		<Card className="flex flex-col">
			<div className="flex flex-col lg:flex-row gap-x-8">
				<CardImage className="rounded-lg bg-red-300"></CardImage>
				<div className="flex flex-col flex-grow">
					<CardHeader className="inline-flex items-center justify-between min-[30px]">
						<span>{activity.title}</span>
						{connectedUser && (
							<div className="float-right">
								{connectedUser?.favorites?.includes(activity.id) ? (
									<IconButton
										icon={<BsBookmarkFill size={20} />}
										onClick={() => dispatch<any>(updateFavorite(activity.id))}
									/>
								) : (
									<IconButton
										icon={<BsBookmark size={20} />}
										onClick={() => dispatch<any>(updateFavorite(activity.id))}
									/>
								)}
							</div>
						)}
					</CardHeader>
					<CardBody className="flex-grow flex flex-col justify-between">
						<div className="inline-flex items-center gap-x-4 max-w-[200px] truncate text-ellipsis">
							<MdOutlineLocationOn size={20} />
							<span className="underline">{activity.address.formatted_address || t('No address')}</span>
						</div>
						<div className="inline-flex items-center gap-x-4">
							<BiTime size={20} />
							{dayjs(activity.date).toDate().toDateString()}
						</div>
						<div className="inline-flex items-center gap-x-4">
							<BsPeople size={20} />
							{activity.participants.length}/{activity.maxPlayers}
						</div>
						<div className="inline-flex items-center gap-x-4">
							<MdOutlinePriceChange size={20} />
							{!activity.price || activity.price === 0 ? (
								t('No entry fee')
							) : (
								<>
									{activity.price}$ &nbsp;
									{t('per person')}
								</>
							)}
						</div>
					</CardBody>
				</div>
			</div>
			<CardCTA>
				<Button type="button" variant="secondary" className="bg-[#EDF7FF] text-[12px] px-2 py-1">
					{t('Details')}
				</Button>
				{connectedUser &&
					activity &&
					(activity.participants?.find((participant) => participant.id === connectedUser.id) ? (
						<Button
							type="button"
							variant="primary"
							isLoading={isUnregistering}
							onClick={handleUnregister}
							className="text-[12px] h-8 px-2 py-1"
							disabled={isUnregistering}
						>
							{t('Uneregister')}
						</Button>
					) : activity.organiser.id === connectedUser.id ? (
						<Button type="button" variant="primary" className="text-[12px] h-8 px-2 py-1">
							{t('Manage event')}
						</Button>
					) : (
						<Button
							type="button"
							variant="primary"
							isLoading={isRegistering}
							onClick={handleRegister}
							className="text-[12px] h-8 px-4 py-1"
							disabled={activity.participants.length >= activity.maxPlayers || isRegistering}
						>
							{activity.participants.length < activity.maxPlayers ? t('Join') : t('Full')}
						</Button>
					))}
			</CardCTA>
		</Card>
	)
}

export default ActivityCard
