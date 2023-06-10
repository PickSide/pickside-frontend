import React, { Children, ReactElement, ReactNode, useMemo, forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { fadeIn } from 'utils'

interface PopoverProps {
	trigger?: ReactElement<any>
	onClose?: () => void
	children?: ReactElement<any>
	positionY?: 'bottom' | 'top'
	positionX?: 'left' | 'right'
}

const Popover = ({ children, trigger, onClose, positionX = 'left', positionY = 'bottom' }: PopoverProps, ref) => {
	const [open, setOpen] = useState(false)
	console.log(ref)
	return (
		<div className="relative">
			{trigger && React.cloneElement(trigger, { onClick: () => setOpen(true) })}
			{open && (
				<>
					<div
						className="absolute z-[80] min-w-3 min-h-4 max-w-fit max-h-fit p-4 shadow-md rounded-xl bg-white -left-32"
						onClick={() => setOpen(false)}
					>
						{children}
					</div>
					<div className="fixed inset-0 z-[70] w-sceen h-screen" onClick={() => setOpen(false)}></div>
				</>
			)}
		</div>
	)
}

export default forwardRef(Popover)
