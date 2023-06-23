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
		<button
			disabled={disabled}
			className="w-full flex items-center font-normal p-3 max-w-56 truncate outline-none
			disabled:bg-slate-50 disabled:text-slate-300 disabled:pointer-events-none 
			hover:bg-primary hover:text-white 
			text-slate-800 cursor-pointer gap-x-4"
			onClick={handleClick}
		>
			<span>{icon}</span>
			<span className="text-ellipsis">{children}</span>
		</button>
	)
}

export default MenuItem
