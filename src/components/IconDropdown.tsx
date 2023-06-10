import React, { ReactNode, forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import { twMerge } from 'tailwind-merge'

interface DropdownProps {
	className?: string
	children?: ReactNode
	icon?: ReactNode
}

const IconDropdown = ({ className, children, icon, ...props }: DropdownProps, ref) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const handler = () => setIsOpen(false)

		document.addEventListener('mouseup', handler)

		return () => document.removeEventListener('mouseup', handler)
	}, [])

	return (
		<div className="z-[60] relative">
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={twMerge('btn-icon inline-flex items-center', className)}
				id="menu-button"
			>
				{icon}
			</button>

			<AnimatePresence initial={false} mode="wait">
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-50" onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute min-w-6 min-h-6 top-10 right-6 mt-2 origin-top-right z-50 rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							initial="closed"
							animate="open"
							exit="exit"
							variants={dropdownAnimation}
						>
							{children}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}
export default forwardRef(IconDropdown)
