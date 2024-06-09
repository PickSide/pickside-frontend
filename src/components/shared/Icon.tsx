import { ComponentPropsWithRef, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@utils'

const validIcons = [
	'account_circle',
	'alternate_email',
	'arrow_forward',
	'arrow_upward',
	'arrow_upward_alt',
	'attach_money',
	'block',
	'bookmark',
	'bookmark_border',
	'calendar_today',
	'chat_bubble_outline',
	'check_circle',
	'check_indeterminate_small',
	'close',
	'dark_mode',
	'delete',
	'edit',
	'error',
	'error_outline',
	'exit_to_app',
	'favorite',
	'group',
	'info',
	'keyboard_arrow_down',
	'keyboard_arrow_left',
	'keyboard_arrow_right',
	'keyboard_arrow_up',
	'language',
	'light_mode',
	'location_on',
	'lock',
	'menu',
	'minimize',
	'mood',
	'more_vert',
	'move_group',
	'move_item',
	'notifications',
	'notifications_active',
	'password',
	'payments',
	'person',
	'place',
	'progress_activity',
	'radio_button_checked',
	'radio_button_unchecked',
	'refresh',
	'remove',
	'schedule',
	'search',
	'send',
	'settings',
	'star',
	'sync',
	'tab_move',
	'today',
	'tune',
	'visibility',
	'visibility_off',
	'warning',
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

export interface IconProps extends ComponentPropsWithRef<'i'>, VariantProps<typeof iconVariants> {
	icon: IconName
}

const Icon = forwardRef<any, IconProps>(({ className, icon, size, variant, ...rest }, ref) => {
	if (!validIcons.includes(icon)) {
		throw new Error(
			'Icon passed is not supported. Please add it from here https://fonts.google.com/icons?selected=Material+Symbols+Outlined:mood:FILL@0;wght@400;GRAD@0;opsz@24',
		)
	}

	return (
		<i ref={ref} className={cn(iconVariants({ className, size, variant }))} {...rest}>
			{icon}
		</i>
	)
})

export default Icon

Icon.defaultProps = {}
