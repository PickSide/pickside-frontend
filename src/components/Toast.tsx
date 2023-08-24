import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode } from 'react'

import { BsInfoCircleFill } from 'react-icons/bs'
import { BsX } from 'react-icons/bs'
import { MdError } from 'react-icons/md'
import { fadeIn } from '@utils'

interface ToastProps {
	show?: boolean
	type?: 'info' | 'success' | 'warning' | 'error'
	onClose?: () => void
	children?: ReactNode
}

const Toast: FC<ToastProps> = ({ type, show = false, onClose, children, ...props }) => {
	return (
		<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
			{show && (
				<motion.div
					variants={fadeIn('right', 0.1, 0.4)}
					initial="hidden"
					animate="show"
					exit="exit"
					className={`min-w-[200px] min-h-[50px] items-center flex bg-primary rounded p-4 space-x-4 shadow-lg`}
				>
					{type === 'success' && (
						<span className="rounded-full text-[#74cd8d] fill-white">
							<AiFillCheckCircle size={25} />
						</span>
					)}
					{type === 'warning' && (
						<span className="rounded-full text-[#FFFF00]">
							<AiFillWarning size={25} />
						</span>
					)}
					{type === 'error' && (
						<span className="rounded-full text-[#c96972]">
							<MdError size={25} />
						</span>
					)}
					{type === 'info' && (
						<span className="rounded-full text-[#156495]">
							<BsInfoCircleFill size={25} />
						</span>
					)}
					<span className=" text-white font-semibold">{children}</span>
					<button
						type="button"
						className="rounded-md w-[25px] h-[25px]  text-white font-semibold cursor-pointer hover:bg-gray-200/90 ease-in-out transition-all duration-75"
						onClick={onClose}
					>
						<BsX size={25} />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Toast
