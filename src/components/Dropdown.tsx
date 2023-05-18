import { ReactNode, forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import { KEY_CODES } from 'utils'

interface DropdownProps {
	children?: ReactNode
	noIcon?: ReactNode
	text?: string
	variant?: 'primary' | 'secondary' | 'tertiary'
}

const Dropdown = ({ children, variant = 'primary', text }: DropdownProps, ref) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handler = (e) => {
		if (e.keyCode === KEY_CODES.ESC) {
			setIsOpen(false)
		}
	}

	return (
		<div className="relative inline-block text-left">
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				onKeyDown={handler}
				className={`btn-${variant} flex  items-center space-x-2`}
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
			>
				{text && <span>{text}</span>}
			</button>
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-50 " onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute right-0 mt-2 origin-top-right z-50 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							initial="closed"
							animate={isOpen ? 'open' : 'closed'}
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
export default forwardRef(Dropdown)
