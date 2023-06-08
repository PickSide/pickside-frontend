import { ReactNode, forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import { KEY_CODES } from 'utils'

interface DropdownProps {
	children?: ReactNode
	icon?: ReactNode
}

const IconDropdown = ({ children, icon, ...props }: DropdownProps, forwardedRef) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const handler = () => setIsOpen(false)

		document.addEventListener('mouseup', handler)

		return () => document.removeEventListener('mouseup', handler)
	}, [])

	return (
		<div className="z-[60] relative inline-block text-left">
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="btn-icon inline-flex items-center space-x-2"
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
			>
				{icon}
			</button>

			<AnimatePresence initial={false} mode="wait">
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-50" onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute top-10 right-6 mt-2 origin-top-right z-50 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
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
