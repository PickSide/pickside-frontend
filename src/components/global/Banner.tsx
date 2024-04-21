import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import Icon, { IconProps } from '../shared/Icon'
import { VariantProps, cva } from 'class-variance-authority'
import { cn, fadeIn } from '@utils'

import IconButton from '@components/IconButton'
import { motion } from 'framer-motion'

export const bannerVariants = cva(
	[
		'flex',
		'w-full',
		'justify-between',
		'items-center',
		'space-x-4',
		'shadow-lg',
		'p-4',
		'z-50',
		'min-h-[50px]',
		'lg:min-w-[200px]',
	],
	{
		variants: {
			severity: {
				info: 'bg-info',
				error: 'bg-error',
				success: 'bg-success',
				warning: 'bg-warning',
			},
		},
		defaultVariants: {
			severity: 'info',
		},
	},
)

export type BannerProps = ComponentPropsWithRef<'div'> & VariantProps<typeof bannerVariants> & {
	children?: ReactNode
	icon?: string
	onClose?: () => void
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(({ onClose, children, className, icon, severity }, ref) => {
	console.log(bannerVariants({ className, severity }))
	return (
		<motion.div
			ref={ref}
			variants={fadeIn('top', 0.1, 0.3)}
			initial="hidden"
			animate="show"
			exit="exit"
			whileInView="show"
			className={cn(bannerVariants({ className, severity }), className)}
		>
			<Icon icon={icon as any} />
			{children}
			<IconButton onClick={onClose}>
				<Icon icon="close" />
			</IconButton>
		</motion.div>
	)
})

export default Banner
