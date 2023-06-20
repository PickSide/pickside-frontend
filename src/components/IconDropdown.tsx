import React, { ReactNode, forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation, IconVariant } from 'utils'
import { twMerge } from 'tailwind-merge'

interface DropdownProps {
	className?: string
	children?: ReactNode
	icon?: ReactNode
	variant?: IconVariant
}

const IconDropdown = ({ className, children, icon, variant = 'primary' }: DropdownProps, ref) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const handler = () => setIsOpen(false)

		document.addEventListener('mouseup', handler)

		return () => document.removeEventListener('mouseup', handler)
	}, [])

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={twMerge(`icon-btn inline-flex items-center`, [className, `icon-${variant}`].join(' '))}
				id="menu-button"
			>
				{icon}
			</button>

			<AnimatePresence initial={false} mode="wait">
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-[100]" onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute z-[150] min-w-6 min-h-6 top-10 right-6 mt-2 p-2 origin-top-right rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none"
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
