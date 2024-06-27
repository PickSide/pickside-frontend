import {
	Children,
	ComponentPropsWithRef,
	ReactElement,
	cloneElement,
	forwardRef,
	isValidElement,
	useEffect,
} from 'react'
import { cn, popUpSubmMenu } from '@utils'

import { motion } from 'framer-motion'

interface PopupMenuV2Props extends ComponentPropsWithRef<'button'> {
	open?: boolean
	trigger: ReactElement
	onClose: (e?) => void
}

const PopupMenuV2 = forwardRef<any, PopupMenuV2Props>(
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
								'absolute z-20 p-3 rounded-md mt-2 bg-white drop-shadow-md min-w-max origin-top-right right-0',
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

export default PopupMenuV2
