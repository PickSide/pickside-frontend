import { cloneElement, forwardRef, useRef, useImperativeHandle, useMemo, useEffect } from 'react'
import { Button } from 'components'
import { MdOutlineClose } from 'react-icons/md'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils'

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

	useEffect(() => console.log(parentRef.current?.getBoundingClientRect(), ref), [])
	return (
		open && (
			<>
				<div className="opacity-25 fixed inset-0 z-10 bg-black h-full overflow-hidden" onClick={onClose}></div>
				<motion.div
					ref={parentRef}
					variants={fadeIn(from, delay, speed)}
					initial="hidden"
					whileInView={'show'}
					className={`fixed ${positionOnScreen} w-[500px] h-screen z-20 ${props.className}`}
				>
					<div className="h-[80px] border-b flex items-center justify-between px-6">
						<span className="uppercase text-[27px] font-semibold">{title}</span>
						<Button isIcon onClick={onClose}>
							<MdOutlineClose size={20} />
						</Button>
					</div>
					{cloneElement(children, { ref: parentRef, ...props })}
				</motion.div>
			</>
		)
	)
}

export default forwardRef(Sidenav)
