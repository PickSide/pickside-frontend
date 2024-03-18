import { ComponentPropsWithRef, forwardRef } from 'react'

import { BiLoaderCircle } from 'react-icons/bi'
import { cn } from '@utils'

interface SpinnerProps extends ComponentPropsWithRef<'div'> {
	className?: string
	text?: string
}

const Spinner = forwardRef<ComponentPropsWithRef<'div'>, SpinnerProps>(({ className, text }, ref) => {
	return (
		<div className={cn('inline-flex items-center gap-x-2', className)} role="status">
			<BiLoaderCircle size={20} className="text-inherit animate-spin" />
			{text && <span className="text-inherit whitespace-nowrap">{text}</span>}
		</div>
	)
})

export default Spinner
