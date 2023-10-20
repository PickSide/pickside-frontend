import { Children, cloneElement, useContext } from 'react'

import CarouselContext from '../context/CarouselContext'

const Carousel = ({ children }) => {
	const { window } = useContext(CarouselContext)
	const items = Children.map(children, (child, idx) =>
		cloneElement(child, { key: idx, className: 'w-[100%] md:w-[50%] lg:w-[33%]' }),
	)

	return (
		<div className="flex justify-center overflow-x-hidden">
			{Array.from(window, (idx) => items[idx]).map((item) => item)}
		</div>
	)
}

export default Carousel
