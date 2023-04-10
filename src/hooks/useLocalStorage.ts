interface UseLocalStorageOutput {
	get: Function
	set: Function
	remove: Function
}

const useLocalStorage = (): UseLocalStorageOutput => {
	const get = (key: string) => {
		const item = localStorage.getItem(key)

		if (!item) return undefined
		if (item === 'null') return null
		if (item === 'undefined') return undefined

		try {
			return JSON.parse(item)
		} catch {}

		return item
	}
	const set = (key: string, value: any) => {
		if (value === undefined) {
			localStorage.removeItem(key)
		} else {
			localStorage.setItem(key, JSON.stringify(value))
		}
	}
	const remove = (key: string) => localStorage.removeItem(key)

	return { get, remove, set }
}

export default useLocalStorage
