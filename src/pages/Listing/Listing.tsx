import { ActivitySelectedSidenav, EventList, Map } from 'widgets'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from 'utils'
import { useDevice } from 'hooks'

const Listing: FC<any> = ({ ...props }) => {
	const { isPc } = useDevice()

	return !isPc ? (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={pageTransition}
			className="h-[calc(100vh-64px)]"
		>
			<div className="h-2/3 bg-red-200">
				<Map />
			</div>
			<div className="h-1/3">
				<EventList />
			</div>
		</motion.div>
	) : (
		<motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition} className="overflow-auto">
			<div className="flex">
				<div className="w-full">
					<Map />
				</div>
				<EventList />
			</div>
		</motion.div>
	)
}

export default Listing
