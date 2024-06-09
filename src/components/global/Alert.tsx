import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn, fadeIn } from '@utils'

import Icon from '../shared/Icon'
import IconButton from '@components/IconButton'
import { motion } from 'framer-motion'

export const alertVariants = cva(
	[
		'flex',
		'justify-between',
		'w-fit',
		'border-2',
		'rounded-md',
		'items-center',
		'shadow-lg',
		'text-white',
		'p-2',
		'min-h-[50px]',
		'lg:min-w-[200px]',
		'xl:justify-normal',
	],
	{
		variants: {
			severity: {
				info: 'bg-info',
				error: 'border-200 bg-error-100 text-error',
				success: 'bg-success',
				warning: 'bg-warning',
			},
		},
		defaultVariants: {
			severity: 'info',
		},
	},
)

export interface AlertProps extends ComponentPropsWithRef<'div'>, VariantProps<typeof alertVariants> {
	children?: ReactNode
	icon?: string
	closable?: boolean
	onClose?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	({ closable = false, onClose, children, className, icon, severity }, ref) => {
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
				<div className="flex items-center space-x-2">
					{icon && <Icon icon={icon as any} />}
					<div>{children}</div>
				</div>
				{closable && (
					<IconButton onClick={onClose} className="ml-auto">
						<Icon icon="close" />
					</IconButton>
				)}
			</motion.div>
		)
	},
)

export default Alert
