import { ReactNode } from 'react'

interface MenuItemsProps {
	icon?: ReactNode
	children?: any
	disabled?: boolean
	onClick?: () => void
}

const MenuItem = ({ children, icon, disabled = false, onClick, ...rest }: MenuItemsProps | any, ref) => {
	const handleClick = () => {
		onClick()
		if (rest.onClose) {
			rest.onClose()
		}
	}

	return (
		<div
			className={`flex items-center font-normal p-3 max-w-56 truncate ${
				disabled
					? 'bg-slate-50 text-slate-300 cursor-not-allowed pointer-events-none'
					: 'hover:bg-primary hover:text-white text-slate-800 cursor-pointer'
			} ${icon ? 'gap-x-4' : ''}`}
			onClick={handleClick}
		>
			<span>{icon}</span>
			<span className="overflow-hidden text-ellipsis">{children}</span>
		</div>
	)
}

export default MenuItem
