import { ActivitySelectedSidenav, EventList, Map } from 'widgets'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'
import { useDevice } from 'hooks'

const Listing: FC<any> = ({ ...props }) => {
	const { isMobile } = useDevice()

	return isMobile ? (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition} className="overflow">
			<EventList />
		</motion.div>
	) : (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition} className="overflow-auto">
			<div id="listing" className="flex">
				<Map />
				<EventList />
			</div>
			<ActivitySelectedSidenav />
		</motion.div>
	)
}

export default Listing
