interface UseLocalStorageOutput {
	get: Function
	set: Function
	remove: Function
}

const useLocalStorage = (): UseLocalStorageOutput => {
	const get = (key: string) => window.localStorage.getItem(key)
	const set = (key: string, value: any) => window.localStorage.setItem(key, value)
	const remove = (key: string) => window.localStorage.removeItem(key)

	return { get, remove, set }
}

export default useLocalStorage
