import { FC, ReactNode } from 'react'
import { AiFillCheckCircle, AiFillWarning, AiFillInfoCircle } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { BsX } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils'

interface AlertProps {
	type?: 'success' | 'warning' | 'error' | 'info'
	children?: ReactNode
	onClose?: () => void
	show?: boolean
}

const AlertIcons = {
	info: { icon: <AiFillInfoCircle size={25} />, class: 'bg-[#156495]' },
	success: { icon: <AiFillCheckCircle size={25} />, class: 'bg-[#74cd8d]' },
	warning: { icon: <AiFillWarning size={25} />, class: 'bg-[#FFFF00]' },
	error: { icon: <BiErrorAlt size={25} />, class: 'bg-[#c96972]' },
}

const Alert: FC<AlertProps> = ({ children, onClose, type = 'info', show = false }) => {
	return (
		<motion.div
			variants={fadeIn('top', 0, 0.4)}
			initial="hidden"
			animate={['visible']}
			exit={['hidden']}
			whileInView={'show'}
			className={`${
				show ? 'visible' : 'hidden'
			} min-w-[200px] min-h-[50px] items-center flex rounded p-4 space-x-4 shadow-lg text-white ${
				AlertIcons[type].class
			}`}
		>
			<span className="">{AlertIcons[type].icon}</span>
			<span className="">{children}</span>
			<span
				className="rounded-full w-[25px] h-[25px] font-semibold cursor-pointer hover:backdrop-brightness-50 hover:opacity-60 ease-in-out transition-all duration-75"
				onClick={onClose}
			>
				<BsX size={25} />
			</span>
		</motion.div>
	)
}

export default Alert
