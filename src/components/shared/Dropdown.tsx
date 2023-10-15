import { AnimatePresence, motion } from 'framer-motion'
import { ComponentPropsWithRef, ReactNode, forwardRef, useEffect, useState } from 'react'
import { KEY_CODES, cn } from '@utils'
import { VariantProps, cva } from 'class-variance-authority'

import { dropdownAnimation } from '@utils'

const dropdownVariants = cva(['btn-base', 'py-1', 'px-1', 'flex', 'flex-col ', 'items-center'], {
	variants: {
		variant: {
			primary: ['text-grey-600', 'disabled:bg-cool-gray-3', 'hover:bg-gray-300', 'dark:text-white'],
			secondary: [
				'text-grey-600',
				'hover:bg-gray-300',
				'disabled:text-gray-400',
				'disabled:border-gray-200/30',
				'disabled:bg-gray-200/60',
				'dark:text-white',
			],
			tertiary: ['text-primary', 'underline', 'font-semibold', 'bg-none ', 'dark:text-white'],
			danger: ['text-white', 'bg-red-600 ', 'hover:bg-red-400'],
		},
		size: {
			sm: [],
			md: [],
			lg: [],
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md',
	},
})

interface DropdownProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof dropdownVariants> {
	icon?: ReactNode
	text?: string
	badge?: ReactNode
}

const Dropdown = forwardRef<ComponentPropsWithRef<'button'>, DropdownProps>(
	({ badge, children, className, size, icon, text, variant, ...rest }, ref) => {
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
			<div className="relative">
				<button
					id="menu-button"
					onClick={() => setIsOpen(true)}
					onKeyDown={handler}
					className={cn(dropdownVariants({ className, size, variant }), className)}
					{...rest}
				>
					{icon}
					{text}
					{badge && <span className="absolute -top-1 right-6 rounded-full">{badge}</span>}
				</button>
				<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
					{isOpen && (
						<>
							<div className="fixed inset-0 w-screen h-screen z-20" onClick={() => setIsOpen(false)}></div>
							<motion.div
								className="absolute right-0 mt-2 origin-top-right z-20 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-clip"
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
	},
)
export default Dropdown
