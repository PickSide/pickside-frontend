import { AppState, setSelectedActivity } from '@state'
import { Gallery, Sidenav } from '@components'
import React, { FC, useMemo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

const ActivitySelectedSidenav: FC<any> = (children) => {
	const dispatch = useDispatch()
	const selectedActivity = useSelector((state: AppState) => state.selectedActivity, shallowEqual)
	const activities = useSelector((state: AppState) => state.activities, shallowEqual)

	const currentActivityInfo = useMemo(
		() => activities?.results?.find((activity) => activity.id === selectedActivity),
		[activities, selectedActivity],
	)

	const handleClose = (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return
		}
		dispatch<any>(setSelectedActivity(null))
	}

	return (
		<Sidenav
			className="bg-white"
			open={!!selectedActivity}
			onClose={handleClose}
			from="left"
			position="right"
			title={currentActivityInfo?.title}
		>
			<Gallery />
		</Sidenav>
	)
}

export default ActivitySelectedSidenav
