import { createContext, useEffect, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useAuth, useLocalStorage } from 'hooks'
import { setStatus } from 'state/appStatus'

const EVENTS = ['click', 'keydown', 'load', 'scroll']
const IDLE_TIMER_KEY = 'sessionTTL'
const IDLE_RESET_TIMER = 900000
const IDLE_CHECK_TIMER = 300000
const IDLE_WARNING_THRESHOLD = 300000

const Context = createContext({})

export const IdleTimeOutProvider: FC<any> = ({ children }) => {
	const { logout } = useAuth()
	const dispatch = useDispatch()
	const { get, set } = useLocalStorage()
	const { t } = useTranslation()

	const checkIfUserIdle = () => {
		const diff = get(IDLE_TIMER_KEY) - Date.now()
		if (diff <= 0) {
			dispatch<any>(setStatus({ status: 'error', message: t('Your session has expired. Reload the page!') }))
			dispatch<any>(logout())
		} else if (diff > 0 && diff <= IDLE_WARNING_THRESHOLD) {
			dispatch<any>(setStatus({ status: 'warning', message: t('Your session is expiring soon.') }))
		} else {
			dispatch<any>(setStatus(null))
		}
	}

	const handleTimePassed = () => {
		set(IDLE_TIMER_KEY, Date.now() + IDLE_RESET_TIMER)
	}

	useEffect(() => {
		EVENTS.forEach((event) => window.addEventListener(event, handleTimePassed))

		return () => {
			EVENTS.forEach((event) => window.removeEventListener(event, handleTimePassed))
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			checkIfUserIdle()
		}, IDLE_CHECK_TIMER)

		return () => clearInterval(interval)
	}, [])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
