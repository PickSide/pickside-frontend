import { Children, FC, Fragment, cloneElement, createContext, useEffect, useMemo, useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { cn, slideIn } from '@utils'

import { motion } from 'framer-motion'
import { times } from 'lodash'
import { useDevice } from '@hooks'

interface CarouselContextProps {
	flow?: 'horizontal' | 'vertical'
}

interface CarouselProps extends CarouselContextProps {
	children?: any
}

interface CarouselItemProps {
	children?: any
}

const CarouselContext = createContext<CarouselContextProps>({})

const CarouselProvider = CarouselContext.Provider

const carouselFlow = {
	horizontal: 'flex',
	vertical: 'flex flex-col',
}

const DEFAULT_WINDOW_LENGTH = 3

const Carousel: FC<CarouselProps> = ({ flow = 'horizontal', ...rest }) => {
	const [device] = useDevice()
	const [slidingFlow, setSlidingFlow] = useState<'left' | 'right'>('right')
	const [slidingWindow, setSlidingWindow] = useState<number[]>(times(DEFAULT_WINDOW_LENGTH, Number))

	const items = Children.map(rest.children, (child, idx) => cloneElement(child, { key: idx }))

	const variant = useMemo(() => slideIn(slidingFlow), [slidingFlow])

	const goLeft = () => {
		if (slidingWindow && items) {
			const newSlidingWindow: number[] = []

			slidingWindow.forEach((value) => {
				if (value === 0) {
					newSlidingWindow.push(items.length - 1)
				} else {
					newSlidingWindow.push(value - 1)
				}
			})

			setSlidingWindow([...newSlidingWindow])
		}
	}

	const goRight = () => {
		if (slidingWindow && items) {
			const newSlidingWindow: number[] = []

			slidingWindow.forEach((value) => {
				if (value === items.length - 1) {
					newSlidingWindow.push(0)
				} else {
					newSlidingWindow.push(value + 1)
				}
			})

			setSlidingWindow([...newSlidingWindow])
		}
	}

	useEffect(() => {
		if (device === 'mobile') {
			setSlidingWindow(times(1, Number))
		} else if (device === 'tablet') {
			setSlidingWindow(times(2, Number))
		} else {
			setSlidingWindow(times(DEFAULT_WINDOW_LENGTH, Number))
		}
	}, [device])

	return (
		<CarouselProvider value={{ flow: 'horizontal' }}>
			<div className="relative w-full">
				<Fragment>
					<motion.div
						initial="hidden"
						animate="show"
						exit="exit"
						whileInView="show"
						variants={variant}
						className={cn('flex justify-center overflow-x-hidden', carouselFlow[flow])}
					>
						{Array.from(slidingWindow, (idx) => items[idx]).map((item, idx) => item)}
					</motion.div>
					<div className="absolute top-1/2 -translate-y-1/2 -translate-x-full left-0 w-8 h-8 rounded-full bg-white border border-gray-300 drop-shadow-sm">
						<span
							className="h-full flex items-center justify-center cursor-pointer text-primary m-auto"
							onClick={goLeft}
						>
							<MdOutlineKeyboardArrowLeft size={25} />
						</span>
					</div>
					<div className="absolute top-1/2 -translate-y-1/2 translate-x-full right-0 w-8 h-8 rounded-full bg-white border border-gray-300 drop-shadow-sm">
						<span className="h-full flex items-center justify-center cursor-pointer text-primary" onClick={goRight}>
							<MdOutlineKeyboardArrowRight size={25} />
						</span>
					</div>
				</Fragment>
			</div>
		</CarouselProvider>
	)
}

export const CarouselItem: FC<CarouselItemProps> = (props) => props.children

export default Carousel
