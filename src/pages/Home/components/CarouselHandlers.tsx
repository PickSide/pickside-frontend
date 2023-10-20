import { Icon, IconButton } from '@components'

import CarouselContext from '../context/CarouselContext'
import { useContext } from 'react'

const CarouselHandlers = () => {
	const { goLeft, goRight } = useContext(CarouselContext)

	return (
		<div className="inline space-x-[7px]">
			<IconButton variant="secondary" size="sm" className="rounded-l-[28px]" onClick={goLeft}>
				<Icon icon="keyboard_arrow_left" />
			</IconButton>
			<IconButton variant="secondary" size="sm" className="rounded-r-[28px]" onClick={goRight}>
				<Icon icon="keyboard_arrow_right" />
			</IconButton>
		</div>
	)
}

export default CarouselHandlers
