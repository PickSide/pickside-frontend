import { AppState, setStatus } from 'state'
import { FC, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useApi } from 'hooks'
import { useLocalStorage } from 'react-use'
import { useTranslation } from 'react-i18next'

const EVENTS = ['click', 'keydown', 'load', 'scroll']
const IDLE_TIMER_KEY = 'sessionTTL'
const IDLE_RESET_TIMER = 900000
const IDLE_CHECK_TIMER = 300000
const IDLE_WARNING_THRESHOLD = 300000

const Context = createContext({})

export const IdleTimeOutProvider: FC<any> = ({ children }) => {
	const { logout } = useApi()
	const dispatch = useDispatch()
	const [IDLE_TIMER, setIdleTimer] = useLocalStorage<number>(IDLE_TIMER_KEY)
	const { t } = useTranslation()

	const user = useSelector((state: AppState) => state.user)

	const checkIfUserIdle = () => {
		if (IDLE_TIMER) {
			const diff = IDLE_TIMER - Date.now()
			if (diff <= 0) {
				dispatch<any>(setStatus({ status: 'error', message: t('Your session has expired. Reload the page!') }))
				dispatch<any>(logout())
			} else if (diff > 0 && diff <= IDLE_WARNING_THRESHOLD) {
				dispatch<any>(setStatus({ status: 'warning', message: t('Your session is expiring soon.') }))
			} else {
				dispatch<any>(setStatus(null))
			}
		}
	}

	const handleTimePassed = () => {
		setIdleTimer(Date.now() + IDLE_RESET_TIMER)
	}

	useEffect(() => {
		EVENTS.forEach((event) => window.addEventListener(event, handleTimePassed))

		return () => {
			EVENTS.forEach((event) => window.removeEventListener(event, handleTimePassed))
		}
	}, [])

	useEffect(() => {
		if (!user) {
			return
		}

		const interval = setInterval(() => {
			checkIfUserIdle()
		}, IDLE_CHECK_TIMER)

		return () => clearInterval(interval)
	}, [user])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
