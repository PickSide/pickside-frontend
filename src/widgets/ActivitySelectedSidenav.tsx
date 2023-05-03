import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Box, Drawer } from '@mui/material'
import { AppState } from 'state'
import { setSelectedActivity } from 'state/selectedActivity'

const ActivitySelectedSidenav = () => {
	const dispatch = useDispatch()

	const selectedActivity = useSelector((state: AppState) => state.selectedActivity, shallowEqual)

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
		<Drawer anchor="right" open={!!selectedActivity} onClose={handleClose}>
			<Box sx={{ width: 400 }}></Box>
		</Drawer>
	)
}

export default ActivitySelectedSidenav
