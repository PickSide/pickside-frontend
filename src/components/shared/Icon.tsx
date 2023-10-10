import { HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

const validIcons = [
	'account_circle',
	'attach_money',
	'bookmark',
	'bookmark_border',
	'chat_bubble_outline',
	'error_outline',
	'group',
	'language',
	'menu',
	'notifications',
	'payments',
	'place',
	'schedule',
	'today',
	'location_on',
	'refresh',
	'close',
	'search',
] as const

export type IconName = (typeof validIcons)[number]

const iconVariants = cva(['material-icons text-primary'], {
	variants: {
		variant: {
			outlined: 'material-icons-outlined',
			standard: '',
		},
		size: {
			sm: 'md-18',
			md: 'md-24',
			lg: 'md-36',
			xlg: 'md-48',
		},
	},
	defaultVariants: {
		variant: 'standard',
		size: 'md',
	},
})

interface IconProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof iconVariants> {
	icon: IconName
}

const Icon = forwardRef<HTMLDivElement, IconProps>(({ className, icon, size, variant, ...rest }, ref) => {
	if (!validIcons.includes(icon)) {
		return null
	}

	return (
		<div ref={ref} className={cn(iconVariants({ className, size, variant }))} {...rest}>
			{icon}
		</div>
	)
})

export default Icon
