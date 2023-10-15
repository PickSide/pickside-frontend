import { Children, ComponentPropsWithRef, cloneElement, forwardRef } from 'react'

import { cn } from '@utils'

interface PopupMenuItemProps extends ComponentPropsWithRef<'div'> {
	active?: boolean
	onClick?: (e?) => void
	onClose?: (e?) => void
}

const PopupMenuItem = forwardRef<HTMLDivElement, PopupMenuItemProps>(
	({ active, children, className, onClick, onClose, ...rest }, ref) => {
		const handleClick = () => {
			onClick && onClick()
			onClose && onClose()
		}

		return (
			<div className="relative" ref={ref} onClick={handleClick}>
				<span className={cn('text-lg text-charcoal-black text-ellipsis', className)}>
					{Children.map(children, (child: any, idx) => cloneElement(child, { onClose, key: idx, ...rest }))}
				</span>
			</div>
		)
	},
)

export default PopupMenuItem
