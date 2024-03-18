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
			<div
				className={cn(
					'relative text-lg text-charcoal-black text-ellipsis hover:text-gray-500 cursor-pointer',
					className,
				)}
				ref={ref}
				onClick={handleClick}
			>
				{Children.map(children, (child: any, idx) =>
					cloneElement(child, { className: 'w-full inline-block', onClose, key: idx, ...rest }),
				)}
			</div>
		)
	},
)

export default PopupMenuItem
