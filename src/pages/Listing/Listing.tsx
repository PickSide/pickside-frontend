import { useIsMobile } from 'hooks'
import { FC } from 'react'
import { ActivitySelectedSidenav, EventList, Map } from 'widgets'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'

const Listing: FC<any> = ({ ...props }) => {
	const isMobile = useIsMobile()
	return !isMobile ? (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition} className="overflow-auto">
			<div id="listing" className="flex">
				<Map />
				<EventList />
			</div>
			<ActivitySelectedSidenav />
		</motion.div>
	) : (
		<div className="overflow-auto">
			<Map />
		</div>
	)
}

export default Listing
