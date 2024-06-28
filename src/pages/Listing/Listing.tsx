import { Activity } from '@state'
import EventList from './components/EventList'
import { FocusEventProvider } from './context/FocusEventContext'
import Map from './components/Map'
import { useState } from 'react'

const Listing = () => {
	const [selectedActivity, setSelectedActivity] = useState<Activity>()

	return (
		<div className="h-[calc(100vh-64px)]">
			<FocusEventProvider>
				<div className="flex h-full w-full">
					<div className="hidden md:block w-full">
						<Map selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
					</div>
					<EventList selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
				</div>
			</FocusEventProvider>
		</div>
	)
}

export default Listing
