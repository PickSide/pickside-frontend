import { Activity, AppState } from '@state'
import { Button, Card, CardBody, CardCTA, CardHeader, Dialog, DialogCTA, Icon, IconButton } from '@components'
import { CardImage, CardProps } from '@components/shared/Card'
import { FC, useMemo, useState } from 'react'

import { ACCOUNT_TYPE } from '@state/me/constants'
import Avatar from '@components/Avatar'
import dayjs from 'dayjs'
import { useActivityHandlers } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface ActivityCardProps extends CardProps {
	activity: Activity
}

const ActivityCard: FC<ActivityCardProps> = ({ activity, className }) => {
	const { t } = useTranslation()
	const {
		isFavorite,
		isFull,
		isRegistering,
		isRegisteredToActivity,
		registerToActivity,
		updateFavorite,
	} = useActivityHandlers(activity)

	const me = useSelector((state: AppState) => state.user)

	const [open, setOpen] = useState<boolean>(false)

	const handleRegister = async (e) => {
		e.stopPropagation()
		await registerToActivity(activity.id)
		setOpen(false)
	}

	const btnText = useMemo(() => {
		if (isRegisteredToActivity) {
			return t('Unregister')
		} else if (!isFull) {
			return t('Join')
		} else {
			return t('Full')
		}
	}, [isRegisteredToActivity])

	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)} title={t('Confirm event registration')}>
				<p>{t('Before registering, you need to understand some rules.')}</p>
				<DialogCTA>
					<Button variant="tertiary" onClick={() => setOpen(false)}>
						{t('Cancel')}
					</Button>
					<Button isLoading={isRegistering} onClick={handleRegister}>
						{isRegisteredToActivity ? t('Unregister') : t('Register')}
					</Button>
				</DialogCTA>
			</Dialog>
			<Card className='flex flex-col w-[400px] h-[462px] m-2'>
				<CardImage className="h-[258px]">
					<img className="w-full h-full bg-card-placeholder bg-contain" src="" alt="" />
				</CardImage>
				<CardBody className="flex flex-col flex-grow-2 justify-center relative px-5 h-fit text-charcoal-black text-sm">
					<div className='absolute -top-[24px] left-0 space-x-2'>
						<Avatar className='border-2 border-ocean-1' variant="secondary" size='lg' src={activity.organizer?.avatar} />
						<span className='absolute top-1/2'>{activity.organizer.username}</span>
					</div>
					<div className="block w-full space-y-2 truncate">
						<div className="flex items-center gap-x-[10px]">
							<span className="text-base">{activity.title}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className='text-cool-gray-3' icon="location_on" />
							<span>{activity.address}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className='text-cool-gray-3' icon="schedule" />
							<span>{dayjs(activity.date).toDate().toDateString()}</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className='text-cool-gray-3' icon="group" />
							<span>
								{activity.participants?.length || 0}/{activity.maxPlayers}
							</span>
						</div>
						<div className="flex items-center gap-x-[10px]">
							<Icon className='text-cool-gray-3' icon="payments" />
							<span>
								{activity.price}$&nbsp;{t('per person')}
							</span>
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	)
}

export default ActivityCard
