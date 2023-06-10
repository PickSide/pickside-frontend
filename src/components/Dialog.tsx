import { FC, ReactNode } from 'react'
import { BsX } from 'react-icons/bs'
import { motion, AnimatePresence } from 'framer-motion'
import { modaleDropIn } from 'utils'

interface DialogProps {
	open?: boolean
	full?: boolean
	title?: string
	onClose?: () => void
	children?: ReactNode
}

const Dialog: FC<DialogProps> = ({ open = false, full = false, title, onClose, children, ...props }) => {
	return (
		<AnimatePresence mode="wait">
			{open ? (
				<>
					<div className="opacity-25 fixed inset-0 z-[90] bg-black" onClick={onClose}></div>
					<motion.div
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={modaleDropIn}
						className={`fixed h-fit z-[100] m-auto inset-0 overflow-hidden w-[95%] md:w-fit`}
					>
						<div className=" bg-white border shadow-sm rounded-md ">
							<div className="flex justify-between items-center py-3 px-4 border-b space-x-5">
								<h3 className="h3 mb-0">{title}</h3>
								<button
									type="button"
									onClick={onClose}
									className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
									data-hs-overlay="#hs-scroll-inside-body-modal"
								>
									<span className="sr-only">Close</span>
									<BsX size={30} />
								</button>
							</div>
							<div className="p-4 overflow-y-auto">{children}</div>
						</div>
					</motion.div>
				</>
			) : (
				<></>
			)}
		</AnimatePresence>
	)
}

export default Dialog
