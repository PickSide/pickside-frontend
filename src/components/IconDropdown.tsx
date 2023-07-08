import { AnimatePresence, motion } from 'framer-motion'
import { IconVariant, dropdownAnimation } from 'utils'
import React, { ReactNode, forwardRef, useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

interface DropdownProps {
	className?: string
	children?: ReactNode
	icon?: ReactNode
	variant?: IconVariant
	badge?: ReactNode
}

const IconDropdown = ({ badge, className, children, icon, variant = 'primary' }: DropdownProps, ref) => {
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
				className={twMerge(`relative icon-btn inline-flex items-center`, [className, `icon-${variant}`].join(' '))}
				id="menu-button"
			>
				{icon}
				{badge && <span className="absolute top-0 -right-1 rounded-full">{badge}</span>}
			</button>

			<AnimatePresence initial={false} mode="wait">
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-[100]" onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute z-[150] min-w-6 min-h-6 top-10 right-6 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none overflow-clip"
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
