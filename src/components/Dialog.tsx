import { ComponentPropsWithoutRef, FC, useEffect } from 'react'
import { cn, modaleDropIn } from '@utils'

import { BsX } from 'react-icons/bs'
import ReactPortal from './shared/ReactPortal'
import { motion } from 'framer-motion'

interface DialogProps extends ComponentPropsWithoutRef<'dialog'> {
	open?: boolean
	onClose: (e?) => void
}

interface DialogCTAProps extends ComponentPropsWithoutRef<'div'> {}

const Dialog: FC<DialogProps> = ({ children, className, open, title, onClose, ...rest }) => {
	useEffect(() => {
		const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null)
		document.body.addEventListener('keydown', closeOnEscapeKey)
		return (): void => {
			document.body.removeEventListener('keydown', closeOnEscapeKey)
		}
	}, [onClose])

	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden'
		return (): void => {
			document.body.style.overflow = 'unset'
		}
	}, [open])

	return open ? (
		<ReactPortal wrapperId="portal">
			<>
				<div className="fixed opacity-25 h-screen w-sreen inset-0 z-20 bg-black" onClick={onClose}></div>
				<motion.dialog
					open
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={modaleDropIn}
					className={cn('fixed z-20 rounded-md inset-0', className)}
				>
					<div className="bg-white border shadow-sm rounded-md min-[100px] max-w-[600px]">
						<div className="flex justify-between items-center py-3 px-4 border-b space-x-5">
							<h3 className="h5 mb-0">{title}</h3>
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
			</>
		</ReactPortal>
	) : null
}

export const DialogCTA: FC<DialogCTAProps> = ({ children }) => (
	<div className="p-4 text-right w-full space-x-4">{children}</div>
)

export default Dialog
