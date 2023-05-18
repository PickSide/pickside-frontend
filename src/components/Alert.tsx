import { FC, ReactNode } from 'react'
import { AiFillCheckCircle, AiFillWarning, AiFillInfoCircle } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils'

interface AlertProps {
	severity?: 'success' | 'warning' | 'error' | 'info'
	children?: ReactNode
	action?: ReactNode
}

const AlertIcons = {
	info: { icon: <AiFillInfoCircle size={25} />, class: 'bg-[#156495]' },
	success: { icon: <AiFillCheckCircle size={25} />, class: 'bg-[#74cd8d]' },
	warning: { icon: <AiFillWarning size={25} />, class: 'bg-[#FFFF00]' },
	error: { icon: <BiErrorAlt size={25} />, class: 'bg-[#c96972]' },
}

const Alert: FC<AlertProps> = ({ children, action, severity = 'info' }) => {
	return (
		<motion.div
			variants={fadeIn('top', 0.1, 0.3)}
			initial="hidden"
			animate="show"
			exit="exit"
			whileInView="show"
			className={`min-w-[200px] min-h-[50px] items-center flex rounded p-4 space-x-4 shadow-lg text-white z-50 ${AlertIcons[severity].class}`}
		>
			<span className="">{AlertIcons[severity].icon}</span>
			<span className="">{children}</span>
			{action}
		</motion.div>
	)
}

export default Alert
