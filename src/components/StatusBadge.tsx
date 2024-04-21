import { ComponentProps, FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

export const statusBadgeVariants = cva(['w-2', 'h-2', 'rounded-full'], {
	variants: {
		variant: {
			online: 'bg-success',
			offline: 'bg-cool-gray-4',
		},
	},
	defaultVariants: {
		variant: 'online',
	},
})

export interface StatusBadgeProps extends ComponentProps<'div'>, VariantProps<typeof statusBadgeVariants> { }

const StatusBadge: FC<StatusBadgeProps> = ({ className, variant }) => {
	return <div className={cn(statusBadgeVariants({ className, variant }))} />
}

export default StatusBadge
