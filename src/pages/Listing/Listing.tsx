import EventList from './components/EventList'
import { FocusEventProvider } from './context/FocusEventContext'
import Map from './components/Map'

const Listing = () => {
	return (
		<div className="h-[calc(100vh-64px)]">
			<FocusEventProvider>
				<div className="flex h-full w-full">
					<Map />
					<EventList />
				</div>
			</FocusEventProvider>
		</div>
	)
}

export default Listing
