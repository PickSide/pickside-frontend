import { useCallback, useRef } from 'react'

const useDebouncedCallback = (func: (e?) => any | Promise<any>, wait) => {
	const timeout = useRef()

	return useCallback(
		(...args) => {
			const later = () => {
				clearTimeout(timeout.current)
				return func(...args)
			}

			clearTimeout(timeout.current)

			//@ts-ignore
			timeout.current = setTimeout(later, wait)
		},
		[func, wait],
	)
}

export default useDebouncedCallback
