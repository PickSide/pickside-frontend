import { BiLoaderCircle } from 'react-icons/bi'
import { FC } from 'react'
import { cn } from '@utils'

interface SpinnerProps {
	className?: string
	textClassName?: string
	iconClassName?: string
	text?: string
}

const Spinner: FC<SpinnerProps> = ({ className, iconClassName, textClassName, text }) => {
	return (
		<div className={cn('inline-flex items-center gap-x-2', className)} role="status">
			<BiLoaderCircle size={20} className={cn('text-gray-500 animate-spin', iconClassName)} />
			{text && <span className={cn('text-gray-400 whƒitespace-nowrap', textClassName)}>{text}</span>}
		</div>
	)
}

export default Spinner
