import { Children, ComponentPropsWithRef, cloneElement, forwardRef, isValidElement, useEffect } from 'react'
import { cn, popUpSubmMenu } from '@utils'

import { motion } from 'framer-motion'

interface PopupMenuProps extends ComponentPropsWithRef<'button'> {
	open?: boolean
	trigger: any
	onClose: (e?) => void
}

const PopupMenu = forwardRef<any, PopupMenuProps>(
	({ className, children, disabled, open, onClose, trigger, ...rest }, ref) => {
		useEffect(() => {
			const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null)
			document.body.addEventListener('keydown', closeOnEscapeKey)
			return (): void => {
				document.body.removeEventListener('keydown', closeOnEscapeKey)
			}
		}, [onClose])

		useEffect(() => {
			if (open) {
				document.body.style.overflow = 'hidden'
			}
			return (): void => {
				document.body.style.overflow = 'unset'
			}
		}, [open])

		const anchorEl = isValidElement(trigger) ? cloneElement(trigger) : <span>{trigger}</span>

		return (
			<div className="relative">
				{anchorEl}
				{open ? (
					<>
						<div className="fixed inset-0 w-screen h-screen z-20" onClick={onClose} />
						<motion.div
							initial="closed"
							animate="open"
							exit="exit"
							variants={popUpSubmMenu}
							className={cn(
								'absolute right-1/2 z-20 min-w-[250px] min-h-[30px] p-[30px] rounded-[20px] bg-cloud space-y-[20px] shadow-menu',
								className,
							)}
						>
							{Children.map(children, (child: any, idx) => cloneElement(child, { onClose, key: idx, ...rest }))}
						</motion.div>
					</>
				) : null}
			</div>
		)
	},
)

export default PopupMenu
