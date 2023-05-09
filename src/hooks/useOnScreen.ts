import React from 'react'

const useOnScreen = (ref, rootMargin = '0px') => {
    const [isIntersecting, setIntersecting] = React.useState(false)

    React.useEffect(() => {
        let observerRefValue = null
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
            },
            {
                rootMargin,
            }
        )
        if (ref.current) {
            observer.observe(ref.current)
            observerRefValue = ref.current
        }
        return () => {
            if (observerRefValue) {
                observer.unobserve(observerRefValue)
            }
        };
    }, [ref, rootMargin])

    return isIntersecting
}

export default useOnScreen