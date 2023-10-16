import { RefObject, useEffect, useState } from 'react'

const useOnScreen = (ref: RefObject<any>, rootMargin = '0px') => {
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		let observerRefValue = null
		const observer = new IntersectionObserver(
			([entry]) => {
				setIntersecting(entry.isIntersecting)
			},
			{
				rootMargin,
			},
		)
		if (ref.current) {
			observer.observe(ref.current)
			observerRefValue = ref.current
		}
		return () => {
			if (observerRefValue) {
				observer.unobserve(observerRefValue)
			}
		}
	}, [ref, rootMargin])

	return isIntersecting
}

export default useOnScreen
