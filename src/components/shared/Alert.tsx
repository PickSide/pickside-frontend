import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn, fadeIn } from '@utils'

import Icon from './Icon'
import IconButton from '@components/IconButton'
import { motion } from 'framer-motion'

export const alertVariants = cva(
	[
		'flex',
		'w-full',
		'justify-between',
		'items-center',
		'space-x-4',
		'shadow-lg',
		'text-white',
		'p-4',
		'z-50',
		'min-h-[50px]',
		'lg:min-w-[200px]',
		'xl:justify-normal',
	],
	{
		variants: {
			severity: {
				info: 'bg-info',
				error: 'bg-error',
				success: 'bg-success',
				warning: 'bg-warning',
			},
			alertIcon: {
				info: 'info',
				error: 'error',
				success: 'check_indeterminate_small',
				warning: 'warning',
			}
		},
		defaultVariants: {
			alertIcon: "info",
			severity: 'info',
		},
	},
)

export interface AlertProps extends ComponentPropsWithRef<'div'>, VariantProps<typeof alertVariants> {
	children?: ReactNode
	onClose?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ onClose, children, className, alertIcon, severity }, ref) => {
	return (
		<motion.div
			ref={ref}
			variants={fadeIn('top', 0.1, 0.3)}
			initial="hidden"
			animate="show"
			exit="exit"
			whileInView="show"
			className={cn(alertVariants({ className, severity }), className)}
		>
			<Icon icon={alertIcon as any} />
			{children}
			<IconButton className="text-white" onClick={onClose}>
				<Icon icon="close" />
			</IconButton>
		</motion.div>
	)
})

export default Alert
