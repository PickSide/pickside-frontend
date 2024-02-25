import { Avatar, Image } from '@components'

import { Activity } from '@state'
import { FC } from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const ActivityDetailsDialog: FC<{ activity: Activity }> = ({ activity }) => {
    const { t } = useTranslation()
    const date = new Date(activity.date)
    const time = new Date(activity.time)
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-center mb-3'>
                <Image />
            </div>
            <div className='grid grid-cols-3 grid-rows-1 gap-3 mb-3'>
                <div className='row-span-1'>
                    <p className='font-semibold'>{t('Address')}</p>
                    <span>{activity.address.formatted_address}</span>
                </div>

                <div className='row-span-1'>
                    <p className='font-semibold'>{t('Price')}</p>
                    <span>{activity.price <= 0 ? t('Free') : `$${activity.price} ${t('entry fee')}`}</span>
                </div>
                <div className='row-span-1'>
                    <p className='font-semibold'>{t('Date')}</p>
                    <p>{date.toDateString()}</p>
                    <p>{moment(time).format('LT')}</p>
                </div>
            </div>
            <div className='flex flex-col mb-3'>
                <p className='font-semibold'>{t('Paticipants')}</p>
                <div className='grid grid-flow-row grid-cols-2 gap-y-2'>
                    {!!activity.participants?.length ? activity.participants?.map((p, idx) => (
                        <div key={idx} className='inline-flex items-center gap-x-2'>
                            <Avatar src={p.avatar} />
                            <p>{p.fullName}</p>
                        </div>
                    )) : 'No participants'}
                </div>

            </div>
            <div className='col-span-2 row-span-2'>
                <p className='font-semibold'>{t('Rules')}</p>
                <span>{activity.rules || t('No rules')}</span>
            </div>
        </div>
    )
}

export default ActivityDetailsDialog