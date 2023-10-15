import { AnimatePresence, motion } from 'framer-motion'
import { FC, ReactNode, useMemo } from 'react'
import { cn, slideIn } from '@utils'

import { IconButton } from '@components'
import { MdOutlineClose } from 'react-icons/md'

interface SidenavProps {
	children?: ReactNode
	className?: string
	delay?: number
	from?: 'left' | 'right'
	noBackdrop?: boolean
	onClose?: any
	open?: boolean
	position?: 'left' | 'right'
	speed?: number
	title?: string
}

const Sidenav: FC<SidenavProps> = ({
	children,
	className,
	delay = 0,
	from = 'right',
	onClose,
	open = false,
	position = 'left',
	speed = 0.1,
	title,
	...rest
}) => {
	const positionOnScreen = useMemo(() => {
		if (position === 'left') {
			return 'top-0 left-0'
		}
		if (position === 'right') {
			return 'top-0 right-0'
		}
	}, [position])

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial="hidden"
					animate="show"
					exit="exit"
					variants={slideIn('right')}
					className={cn(`fixed w-[500px] h-screen z-100 bg-white shadow-md`, className, positionOnScreen)}
				>
					<div className="h-[80px] border-b flex items-center justify-between px-6">
						<span className="uppercase text-[27px] font-semibold">{title}</span>
						<IconButton icon={<MdOutlineClose size={20} />} onClick={onClose} />
					</div>
					<div className="block p-6">{children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Sidenav
