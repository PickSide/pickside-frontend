import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'

import { cn } from '@utils'

interface MenuItemProps extends ComponentPropsWithRef<'div'> {
	active?: boolean
	disabled?: boolean
	hoverable?: boolean
	icon?: ReactNode
}

const MenuItem = forwardRef<any, MenuItemProps>(({ active, children, className, disabled = false, hoverable = true, icon, ...rest }, ref) => {
	return (
		<div
			ref={ref}
			className={cn(
				'w-full flex items-center p-2 truncate cursor-pointer gap-x-3',
				active ? 'bg-ocean dark:bg-grey-600 text-white' : '',
				disabled ? 'disabled:bg-slate-50 disabled:text-slate-300 disabled:pointer-events-none' : '',
				hoverable ? 'hover:bg-ocean dark:hover:bg-grey-600 hover:text-white' : '',
				className,
			)}
			onClick={(e, ...args) => {
				rest.onClick && rest.onClick(e, ...args)
			}}
			{...rest}
		>
			{icon}
			<span className="text-ellipsis">{children}</span>
		</div>
	)
})

export default MenuItem
