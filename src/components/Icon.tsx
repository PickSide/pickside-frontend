import { FC } from 'react'
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
] as const

export type IconName = (typeof validIcons)[number]

interface IconProps {
	className?: string
	size?: 'sm' | 'md' | 'lg' | 'xlg'
	variant?: 'outlined' | 'standard'
	icon: IconName
}

const Icon: FC<IconProps> = ({ icon, size = 'md', variant = 'standard', ...rest }) => {
	const sizes = {
		sm: 'md-18',
		md: 'md-24',
		lg: 'md-36',
		xlg: 'md-48',
	}

	if (!validIcons.includes(icon)) {
		return null
	}

	return (
		<span
			className={cn(
				'material-icons text-primary',
				variant === 'outlined' ? 'material-icons-outlined' : '',
				sizes[size],
			)}
		>
			{icon}
		</span>
	)
}

export default Icon
