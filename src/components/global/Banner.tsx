import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn, fadeIn } from '@utils'

import Icon from '../shared/Icon'
import IconButton from '@components/IconButton'
import { motion } from 'framer-motion'

export const bannerVariants = cva('grid grid-row-1 grid-cols-8 grid-flow-col shadow-lg p-4 z-50 min-h-[50px]',
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
	closable?: boolean
	icon?: string
	onClose?: () => void
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(({ onClose, children, closable = false, className, icon, severity }, ref) => {
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
			<Icon className='col-span-1' icon={icon as any} />
			<div className='col-span-6 place-self-center'>
				{children}
			</div>
			{closable && (
				<div className="col-span-1 place-self-end">
					<IconButton onClick={onClose}>
						<Icon icon="close" />
					</IconButton>
				</div>
			)}
		</motion.div>
	)
})

export default Banner
