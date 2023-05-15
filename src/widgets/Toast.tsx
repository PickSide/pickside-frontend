import { FC, ReactNode, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsX } from 'react-icons/bs'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BsInfoCircleFill } from 'react-icons/bs'
import { MdError } from 'react-icons/md'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils/variants'

interface ToastProps {
	show?: boolean
	type?: 'info' | 'success' | 'warning' | 'error'
	onClose?: () => void
	children?: ReactNode
}

const Toast: FC<ToastProps> = ({ type, show = false, onClose, children, ...props }) => {
	return (
		<motion.div
			animate={['hidden', 'visible']}
			variants={fadeIn('right', 0, 0.4)}
			initial="hidden"
			whileInView={'show'}
			className={`${
				show ? 'visible' : 'hidden'
			} min-w-[200px] min-h-[50px] items-center flex bg-[#51b5aa] rounded p-4 space-x-4 shadow-lg`}
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
			<span
				className="rounded-full w-[25px] h-[25px]  text-white font-semibold cursor-pointer hover:bg-[#208378] hover:opacity-60 ease-in-out transition-all duration-75"
				onClick={onClose}
			>
				<BsX size={25} />
			</span>
		</motion.div>
	)
}

export default Toast
