import { FC, createContext, useCallback, useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { AppState } from '@state'
import { useLogout } from '@hooks'
import { useSelector } from 'react-redux'

const EVENTS = ['click', 'dblclick', 'drag', 'keydown', 'load', 'scroll', 'zoom']
const IDLE_TIMER_KEY = 'sessionTTL'
const IDLE_RESET_TIMER = 5 * 900000
const IDLE_CHECK_TIMER = 300000
const IDLE_WARNING_THRESHOLD = 5 * 300000

const Context = createContext({})

export const IdleTimeOutProvider: FC<any> = ({ children }) => {
	const [IDLE_TIMER, setIdleTimer] = useLocalStorage<number>(IDLE_TIMER_KEY, Date.now())
	const { logout } = useLogout()

	const user = useSelector((state: AppState) => state.user)

	const checkIfUserIdle = useCallback(() => {
		if (IDLE_TIMER) {
			const diff = IDLE_TIMER - Date.now()
			if (diff <= 0) {
				logout()
			} else if (diff > 0 && diff <= IDLE_WARNING_THRESHOLD) {
				//dispatch(setStatus({ icon: <Icon icon='warning' />, status: 'warning', message: t('Your session is expiring soon.') }))
			} else {
				//dispatch(setStatus(null))
			}
		}
	}, [IDLE_TIMER, logout])

	const handleTimePassed = () => {
		setIdleTimer(Date.now() + IDLE_RESET_TIMER)
	}

	useEffect(() => {
		EVENTS.forEach((event) => window.addEventListener(event, handleTimePassed))

		return () => {
			EVENTS.forEach((event) => window.removeEventListener(event, handleTimePassed))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!user) {
			return
		}

		const interval = setInterval(() => {
			checkIfUserIdle()
		}, IDLE_CHECK_TIMER)

		return () => clearInterval(interval)
	}, [checkIfUserIdle, user])

	return <Context.Provider value={{}}></Context.Provider>
}

export default Context
