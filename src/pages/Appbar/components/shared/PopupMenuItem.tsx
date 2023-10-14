import { Children, ComponentPropsWithRef, cloneElement, forwardRef } from 'react'

import PropTypes from 'prop-types'

interface PopupMenuItemProps extends ComponentPropsWithRef<'div'> {
	active?: boolean
	onClick?: (e?) => void
	onClose?: (e?) => void // Implicit
}

const PopupMenuItem = forwardRef<HTMLDivElement, PopupMenuItemProps>(
	({ active, children, className, onClick, onClose, ...rest }, ref) => {
		const handleClick = () => {
			onClick && onClick()
			onClose && onClose()
			console.log('called')
			console.log('onClick', onClick)
			console.log('onClose', onClose)
		}

		return (
			<div className="relative" ref={ref} onClick={handleClick}>
				<span className="text-lg text-charcoal-black text-ellipsis">
					{Children.map(children, (child: any, idx) => cloneElement(child, { onClose, key: idx, ...rest }))}
				</span>
			</div>
		)
	},
)

export default PopupMenuItem

// PopupMenuItem.propTypes = {
// 	children: PropTypes.array,
// }
