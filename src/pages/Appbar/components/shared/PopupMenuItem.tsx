import { Children, ComponentPropsWithRef, cloneElement, forwardRef } from 'react'

import { cn } from '@utils'

interface PopupMenuItemProps extends ComponentPropsWithRef<'button'> {
	active?: boolean
	disabled?: boolean
	onClick?: (e?) => void
	onClose?: (e?) => void
}

const PopupMenuItem = forwardRef<HTMLButtonElement, PopupMenuItemProps>(
	({ active, children, className, disabled = false, onClick, onClose, ...rest }, ref) => {
		const handleClick = () => {
			onClick && onClick()
			onClose && onClose()
		}

		return (
			<button
				className={cn(
					'relative block text-lg text-charcoal-black text-ellipsis hover:text-gray-500 cursor-pointer disabled:text-cool-gray-3 disabled:pointer-events-none',
					className,
				)}
				disabled={disabled}
				ref={ref}
				onClick={handleClick}
			>
				{Children.map(children, (child: any, idx) =>
					cloneElement(child, { className: 'w-full inline-block', onClose, key: idx, ...rest }),
				)}
			</button>
		)
	},
)

export default PopupMenuItem
