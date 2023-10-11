import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'

import { cn } from '@utils'

interface MenuItemProps extends ComponentPropsWithRef<'button'> {
	active?: boolean
	icon?: ReactNode
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(({ active, children, className, icon, ...rest }, ref) => {
	return (
		<button
			ref={ref}
			className={cn(
				'w-full flex items-center font-normal p-3 max-w-56 truncate outline-none disabled:bg-slate-50 disabled:text-slate-300 disabled:pointer-events-none text-slate-800 cursor-pointer gap-x-4 hover:bg-primary hover:text-white',
				active ? 'bg-primary text-white' : '',
				className,
			)}
			{...rest}
		>
			<span>{icon}</span>
			<span className="text-ellipsis">{children}</span>
		</button>
	)
})

export default MenuItem
