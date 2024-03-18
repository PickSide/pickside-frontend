import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'

import { cn } from '@utils'

interface MenuItemProps extends ComponentPropsWithRef<'button'> {
	active?: boolean
	icon?: ReactNode
}

const MenuItem = forwardRef<any, MenuItemProps>(({ active, children, className, icon, ...rest }, ref) => {
	return (
		<button
			ref={ref}
			className={cn(
				'w-full flex items-center p-2 truncate disabled:bg-slate-50 disabled:text-slate-300 disabled:pointer-events-none cursor-pointer gap-x-3 hover:bg-ocean dark:hover:bg-grey-600 hover:text-white',
				active ? 'bg-ocean dark:bg-grey-600 text-white' : '',
				className,
			)}
			onClick={(e, ...args) => {
				rest.onClick && rest.onClick(e, ...args)
			}}
			{...rest}
		>
			{icon}
			<span className="text-ellipsis">{children}</span>
		</button>
	)
})

export default MenuItem
