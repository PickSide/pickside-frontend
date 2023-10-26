import { ComponentPropsWithRef, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

const validIcons = [
	'account_circle',
	'attach_money',
	'arrow_upward',
	'arrow_upward_alt',
	'alternate_email',
	'bookmark',
	'bookmark_border',
	'chat_bubble',
	'error_outline',
	'group',
	'keyboard_arrow_down',
	'keyboard_arrow_left',
	'keyboard_arrow_right',
	'language',
	'lock',
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
	'sync',
	'radio_button_checked',
	'radio_button_unchecked',
	'visibility',
	'visibility_off',
	'delete',
	'edit',
	'info',
	'favorite',
	'star',
	'settings',
	'more_vert',
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
			xs: 'md-12',
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

interface IconProps extends ComponentPropsWithRef<'i'>, VariantProps<typeof iconVariants> {
	icon: IconName
}

const Icon = forwardRef<ComponentPropsWithRef<'i'>, IconProps>(({ className, icon, size, variant, ...rest }, ref) => {
	if (!validIcons.includes(icon)) {
		return null
	}

	return (
		<i className={cn(iconVariants({ className, size, variant }))} {...rest}>
			{icon}
		</i>
	)
})

export default Icon
