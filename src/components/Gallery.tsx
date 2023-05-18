import { FC, useCallback, forwardRef, useEffect, useMemo, useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { VscCircle, VscCircleFilled } from 'react-icons/vsc'
import { Button } from 'components'
import { motion } from 'framer-motion'
import { fadeIn } from 'utils'

interface GalleryProps {
	images?: any
}

const OFFSET = 400
const IMAGES = [
	'https://lh3.googleusercontent.com/p/AF1QipMeu-K39F0mCeQiy9i5LP6Q4v_EV--h9fhfIbmO=s680-w680-h510',
	'https://lh3.googleusercontent.com/p/AF1QipPrCPJasPCNXWK2ENeEKopYkFtvp6PyPSL6C08U=s680-w680-h510',
	'https://lh3.googleusercontent.com/p/AF1QipPRr8lZHn604W2YLsjRlTlWKe9LwW9wJd1n8Zef=s680-w680-h510',
	'https://lh3.googleusercontent.com/p/AF1QipMhIH2YG_PHedEK9I74P6ceYUQsiLsnkF5mYdbJ=s680-w680-h510',
	'https://lh3.googleusercontent.com/p/AF1QipNpguHBmYePWBkVN0wBplguMwhUxqAJVktmDehF=s680-w680-h510',
	//'https://lh3.googleusercontent.com/p/AF1QipN684P0RNdX2TvWv873Ad1NSa9aILGyiX4w2wBT=s680-w680-h510',
]

const Gallery = ({ images = IMAGES, ...props }, ref) => {
	const [currentIdx, setCurrentIdx] = useState<number>(0)
	const [direction, setDirection] = useState<'left' | 'right'>()

	const parentWidth = useMemo(() => ref.current?.offsetWidth || 0, [ref])
	const showLeft = useMemo(() => currentIdx > 0, [currentIdx])
	const showRight = useMemo(() => currentIdx < images.length - 1, [images, currentIdx])
	const translate = useMemo(() => `-translate-x-[${currentIdx * parentWidth}px]`, [currentIdx, parentWidth])
	const containerWidth = useMemo(() => `w-[${images.length * parentWidth}px]`, [images.length, parentWidth])

	const goLeft = useCallback(() => {
		if (currentIdx === 0) {
			return
		}
		setDirection('left')
		setCurrentIdx(currentIdx - 1)
	}, [currentIdx, setCurrentIdx])

	const goRight = useCallback(() => {
		if (currentIdx === images.length - 1) {
			return
		}
		setDirection('right')
		setCurrentIdx(currentIdx + 1)
	}, [currentIdx, images, setCurrentIdx])

	const handleBottomNav = (e, idx) => setCurrentIdx(idx)

	useEffect(() => {
		console.log(ref.current.offsetWidth)
		console.log('currentIdx: ', currentIdx)
		console.log('direction: ', direction)
	}, [currentIdx, direction, ref])

	return (
		<div className="relative w-full h-[300px] overflow-hidden">
			<div className={`absolute ${containerWidth} h-full flex ${translate} z-0`}>
				{images.map((image, idx) => (
					<img key={idx} alt="" src={image} className="bg-contain w-full h-full" />
				))}
			</div>
			<div className="absolute w-full h-full z-10"></div>
			{showLeft && (
				<div className="absolute left-5 top-1/2 -translate-y-1/4 z-10">
					<Button isIcon onClick={goLeft}>
						<MdOutlineKeyboardArrowLeft size={20} />
					</Button>
				</div>
			)}
			{showRight && (
				<div className="absolute right-5 top-1/2 -translate-y-1/4 z-10">
					<Button isIcon onClick={goRight}>
						<MdOutlineKeyboardArrowRight size={20} />
					</Button>
				</div>
			)}
			{images?.length > 1 && (
				<div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
					{images.map((x, idx) => (
						<Button isIcon key={idx} onClick={(e) => handleBottomNav(e, idx)}>
							{currentIdx === idx ? <VscCircleFilled size={20} /> : <VscCircle size={20} />}
						</Button>
					))}
				</div>
			)}
		</div>
	)
}

export default forwardRef(Gallery)
