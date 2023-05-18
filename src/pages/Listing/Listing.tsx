import { useIsMobile } from 'hooks'
import { FC } from 'react'
import { ActivitySelectedSidenav, EventList, Map } from 'widgets'

const Listing: FC<any> = ({ ...props }) => {
	const isMobile = useIsMobile()
	return !isMobile ? (
		<div className="overflow-auto">
			<div id="listing" className="flex">
				<Map />
				<EventList />
			</div>
			<ActivitySelectedSidenav />
		</div>
	) : (
		<div className="overflow-auto">
			<Map />
		</div>
	)
}

export default Listing
