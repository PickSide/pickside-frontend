import { AppState, setSelectedActivity } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import EventList from './components/EventList'
import { FocusEventProvider } from './context/FocusEventContext'
import Map from './components/Map'
import { Sidenav } from '@components'

const Listing = () => {
	const dispatch = useDispatch()

	const selectedActivity = useSelector((state: AppState) => state.selectedActivity)

	return (
		<div className="h-[calc(100vh-64px)]">
			<FocusEventProvider>
				<Sidenav
					open={!!selectedActivity}
					onClose={() => dispatch(setSelectedActivity(null))}
					position="right"
					title={selectedActivity?.title}
				>
					<div>{selectedActivity?.title}</div>
				</Sidenav>
				<div className="flex h-full w-full">
					<Map />
					<EventList />
				</div>
			</FocusEventProvider>
		</div>
	)
}

export default Listing
