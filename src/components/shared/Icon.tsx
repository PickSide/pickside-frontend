import { HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

const validIcons = [
	'account_circle',
	'attach_money',
	'arrow_upward',
	'arrow_upward_alt',
	'bookmark',
	'bookmark_border',
	'chat_bubble',
	'error_outline',
	'group',
	'keyboard_arrow_right',
	'language',
	'menu',
	'notifications',
	'payments',
	'person',
	'place',
	'progress_activity',
	'schedule',
	'today',
	'location_on',
	'light_mode',
	'dark_mode',
	'refresh',
	'close',
	'search',
] as const

export type IconName = (typeof validIcons)[number]

const iconVariants = cva(['text-inherit'], {
	variants: {
		variant: {
			filled: 'material-icons',
			outlined: 'material-icons-outlined',
			round: 'material-icons-round',
			sharp: 'material-icons-sharp',
			two_tones: 'material-icons-two-tones',
		},
		size: {
			sm: 'md-18',
			md: 'md-24',
			lg: 'md-36',
			xlg: 'md-48',
		},
	},
	defaultVariants: {
		variant: 'outlined',
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
		<i ref={ref} className={cn(iconVariants({ className, size, variant }))} {...rest}>
			{icon}
		</i>
	)
})

export default Icon
