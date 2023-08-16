import { AnimatePresence, motion } from 'framer-motion'
import { Button, IconButton } from '@components'
import { cloneElement, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react'

import { MdOutlineClose } from 'react-icons/md'
import { fadeIn } from '@utils'

interface SidenavProps {
	delay?: number
	from?: 'left' | 'right'
	noBackdrop?: boolean
	onClose?: () => void
	open?: boolean
	position?: 'left' | 'right'
	speed?: number
	title?: string
}

const Sidenav = (props: SidenavProps | any, ref) => {
	const { children, delay = 0, from = 'right', onClose, open = false, position = 'left', speed = 0.1, title } = props
	const parentRef = useRef<any>()

	const positionOnScreen = useMemo(() => {
		if (position === 'left') {
			return 'top-0 left-0'
		}
		if (position === 'right') {
			return 'top-0 right-0'
		}
	}, [position])

	useImperativeHandle(
		ref,
		() => {
			return {
				boundingRect: parentRef.current?.getBoundingClientRect,
			}
		},
		[],
	)

	return (
		open && (
			<>
				<div className="opacity-25 fixed inset-0 z-10 bg-black h-full overflow-hidden" onClick={onClose}></div>

				<AnimatePresence initial={false} mode="wait">
					<motion.div
						ref={parentRef}
						variants={fadeIn(from, delay, speed)}
						initial="hidden"
						animate="show"
						exit="exit"
						className={`fixed ${positionOnScreen} w-[500px] h-screen z-[400] ${props.className}`}
					>
						<div className="h-[80px] border-b flex items-center justify-between px-6">
							<span className="uppercase text-[27px] font-semibold">{title}</span>
							<IconButton icon={<MdOutlineClose size={20} />} onClick={onClose} />
						</div>
						{cloneElement(children, { ref: parentRef, ...props })}
					</motion.div>
				</AnimatePresence>
			</>
		)
	)
}

export default forwardRef(Sidenav)
