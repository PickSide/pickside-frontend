import { createContext, useCallback, useEffect, useState } from 'react'

import { times } from 'lodash'
import { useDevice } from '@hooks'

interface CarouselContextProps {
	goRight: () => void
	goLeft: () => void
	window: any[]
}

export const CarouselContext = createContext<CarouselContextProps>({
	goLeft: () => console.log('left'),
	goRight: () => console.log('right'),
	window: [],
})

const DEFAULT_WINDOW_LENGTH = 3

export const CarouselProvider = ({ items = [], children }: { items?: any[]; children: any }) => {
	const [window, setWindow] = useState<number[]>(times(DEFAULT_WINDOW_LENGTH, Number))

	const [device] = useDevice()

	const itemCount = items.length

	const goLeft = useCallback(() => {
		if (window && itemCount) {
			const newWindow: number[] = []

			window.forEach((value) => {
				if (value === 0) {
					newWindow.push(itemCount - 1)
				} else {
					newWindow.push(value - 1)
				}
			})

			setWindow([...newWindow])
		}
	}, [itemCount, window])

	const goRight = useCallback(() => {
		if (window && itemCount) {
			const newWindow: number[] = []

			window.forEach((value) => {
				if (value === itemCount - 1) {
					newWindow.push(0)
				} else {
					newWindow.push(value + 1)
				}
			})

			setWindow([...newWindow])
		}
	}, [itemCount, window])

	useEffect(() => {
		if (device === 'mobile') {
			setWindow(times(1, Number))
		} else if (device === 'tablet') {
			setWindow(times(2, Number))
		} else {
			setWindow(times(3, Number))
		}
	}, [device])

	return <CarouselContext.Provider value={{ goRight, goLeft, window }}>{children}</CarouselContext.Provider>
}

export default CarouselContext
