import { AnimatePresence, motion } from 'framer-motion'
import { KEY_CODES, cn } from '@utils'
import { ReactNode, forwardRef, useEffect, useState } from 'react'

import { dropdownAnimation } from '@utils'
import { twMerge } from 'tailwind-merge'

interface DropdownProps {
	children?: ReactNode
	className?: string
	start?: ReactNode
	text?: string
	badge?: ReactNode
	type?: 'button' | 'reset' | 'submit'
	variant?: 'primary' | 'secondary' | 'tertiary'
}

const Dropdown = (
	{ badge, children, start, variant = 'primary', type = 'button', text, ...rest }: DropdownProps,
	ref,
) => {
	const variants = {
		primary: 'text-white bg-primary hover:bg-gray-300 disabled:bg-gray-100/60 dark:bg-white dark:text-black',
		secondary: 'text-primary',
		tertiary: 'dark:text-white hover:bg-gray-200 focus',
		danger: 'text-danger',
	}

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handler = (e) => {
		if (e.keyCode === KEY_CODES.ESC) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		const handler = () => setIsOpen(false)
		document.addEventListener('mouseup', handler)
		return () => document.removeEventListener('mouseup', handler)
	}, [])

	return (
		<div className="relative inline-block text-left">
			<button
				onClick={() => setIsOpen(true)}
				onKeyDown={handler}
				className={cn('relative  hover:scale-110 btn-base flex flex-col items-center gap-x-2', [variants[variant]])}
				id="menu-button"
				aria-expanded="true"
				aria-haspopup="true"
				{...rest}
			>
				{start}
				{text}
				{badge && <span className="absolute -top-2 right-6 rounded-full">{badge}</span>}
			</button>
			<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
				{isOpen && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-[1000]" onClick={() => setIsOpen(false)}></div>
						<motion.div
							className="absolute right-0 mt-2 origin-top-right z-[1000] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-clip"
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
