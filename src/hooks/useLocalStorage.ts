interface UseLocalStorageOutput {
	get: Function
	set: Function
	remove: Function
}

const useLocalStorage = (): UseLocalStorageOutput => {
	const get = (key: string) => key && JSON.parse(window.localStorage.getItem(key) || '')
	const set = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value))
	const remove = (key: string) => window.localStorage.removeItem(key)

	return { get, remove, set }
}

export default useLocalStorage
