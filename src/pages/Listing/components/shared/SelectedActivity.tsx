import { Activity } from '@state'
import { FC } from 'react'

const SelectedActivity: FC<{ activity: Activity }> = ({ activity }) => {
	return <div>{activity.title}</div>
}

export default SelectedActivity
