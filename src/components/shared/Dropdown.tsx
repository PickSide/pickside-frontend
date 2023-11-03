import { AnimatePresence, motion } from 'framer-motion'
import { ComponentPropsWithRef, ReactNode, forwardRef, useEffect, useState } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'
import { dropdownAnimation } from '@utils'

const dropdownVariants = cva(['text-inherit', 'rounded', 'text-base', 'leading-none'], {
	variants: {
		variant: {
			primary: [
				'text-primary',
				'bg-none',
				'disabled:bg-cool-gray-3',
				'hover:bg-gray-300',
				'dark:bg-grey-600',
				'dark:text-white',
				'dark:hover:bg-gray-300',
			],
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
			sm: ['p-1'],
			md: ['p-2'],
			lg: ['p-3'],
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

		useEffect(() => {
			const closeOnEscapeKey = (e: KeyboardEvent) => {
				return e.key === 'Escape' ? setIsOpen(false) : null
			}
			const handler = () => setIsOpen(false)
			document.addEventListener('keydown', closeOnEscapeKey)
			document.addEventListener('mouseup', handler)
			return (): void => {
				document.removeEventListener('keydown', closeOnEscapeKey)
				document.removeEventListener('mouseup', handler)
			}
		}, [])

		return (
			<div className="relative">
				<button
					id="menu-button"
					onClick={() => setIsOpen(true)}
					className={cn(dropdownVariants({ className, size, variant }), className)}
					{...rest}
				>
					{icon}
					{text}
					{badge && <span className="absolute -top-1 left-1/2 rounded-full">{badge}</span>}
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
