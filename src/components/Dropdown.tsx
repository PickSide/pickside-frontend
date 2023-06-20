import { ReactNode, forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import { KEY_CODES } from 'utils'
import { twMerge } from 'tailwind-merge'

interface DropdownProps {
	children?: ReactNode
	className?: string
	start?: ReactNode
	text?: string
	type?: 'button' | 'reset' | 'submit'
	variant?: 'primary' | 'secondary' | 'tertiary'
}

const Dropdown = ({ children, start, variant = 'primary', type = 'button', text, ...rest }: DropdownProps, ref) => {
	const variants = {
		primary: 'text-white bg-primary hover:bg-gray-200',
		secondary: 'text-primary',
		tertiary: 'text-primary hover:bg-gray-200',
		danger: 'text-danger',
	}

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handler = (e) => {
		if (e.keyCode === KEY_CODES.ESC) {
			setIsOpen(false)
		}
	}

	return (
		<div className="relative inline-block text-left">
			<button
				onClick={() => setIsOpen(true)}
				onKeyDown={handler}
				className={twMerge('btn-base inline-flex items-center gap-x-2', [variants[variant]].join(' '))}
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
				{...rest}
			>
				{start}
				{text}
			</button>
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-[1000]" onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute right-0 mt-2 origin-top-right z-[1000] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							initial="closed"
							animate="open"
							exit="closed"
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
