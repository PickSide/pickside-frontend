import { AnimatePresence, motion } from 'framer-motion'
import { ComponentPropsWithoutRef, FC } from 'react'
import { cn, modaleDropIn } from '@utils'

import { BsX } from 'react-icons/bs'

interface DialogProps extends ComponentPropsWithoutRef<'dialog'> {
	open?: boolean
	onClose?: (e?) => void
}

const Dialog: FC<DialogProps> = ({ children, className, open = false, title, onClose, ...rest }) => {
	return open ? (
		<AnimatePresence mode="wait">
			<div className="opacity-25 h-screen w-sreen fixed inset-0 z-20 bg-black" onClick={onClose}></div>
			<motion.dialog
				open
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={modaleDropIn}
				className={cn(`fixed z-20 overflow-hidden h-fit inset-0 m-auto md:w-fit`, className)}
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
			</motion.dialog>
		</AnimatePresence>
	) : null
}

export const DialogCTA = ({ children }) => <div className="h-16 border-t-2 inline-flex items-center">{children}</div>

export default Dialog
