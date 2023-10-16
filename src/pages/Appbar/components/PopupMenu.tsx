import { Children, ComponentPropsWithRef, ReactNode, cloneElement, forwardRef } from 'react'
import { cn, popUpSubmMenu } from '@utils'

import { motion } from 'framer-motion'

interface PopupMenuProps extends ComponentPropsWithRef<'button'> {
	open?: boolean
	trigger?: ReactNode
	onClose?: (e?) => void
}

const PopupMenu = forwardRef<HTMLButtonElement, PopupMenuProps>(
	({ className, children, disabled, open, onClose, trigger, ...rest }, ref) => {
		return (
			<div className="relative">
				{trigger}
				{open && (
					<>
						<div className="fixed inset-0 w-screen h-screen z-20" onClick={onClose} />
						<motion.div
							initial="closed"
							animate="open"
							exit="exit"
							variants={popUpSubmMenu}
							className={cn(
								'absolute -right-1/2 top-[115%] z-20 min-w-[300px] min-h-[30px] w-fit p-[30px] rounded-[20px] bg-cloud space-y-[20px] shadow-menu',
								className,
							)}
						>
							{Children.map(children, (child: any, idx) => cloneElement(child, { onClose, key: idx, ...rest }))}
						</motion.div>
					</>
				)}
			</div>
		)
	},
)

export default PopupMenu
