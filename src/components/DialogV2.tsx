import { FC, ReactNode, useState } from 'react'
import { BsX } from 'react-icons/bs'

interface DialogProps {
	open?: boolean
	title?: string
	onClose?: () => void
	children?: ReactNode
}

const DialogV2: FC<DialogProps> = ({ open = false, title, onClose, children, ...props }) => {
	return open ? (
		<>
			<div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={onClose}></div>
			<div className="w-[95%] fixed m-auto md:top-0 max-h-[85%] md:w-fit z-[60] inset-0 overflow-hidden">
				<div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-md">
					<div className="flex justify-between items-center py-3 pl-8 pr-4 border-b ">
						<h3 className="h3 text-primary mb-0">{title}</h3>
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
					<div className="p-4 overflow-y-auto scrollbar">{children}</div>
					<div className="flex justify-end items-center border-t">{}</div>
				</div>
			</div>
		</>
	) : (
		<></>
	)
}

export default DialogV2
