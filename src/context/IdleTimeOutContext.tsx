import { FC, createContext, useCallback, useEffect } from 'react'
import { useEffectOnce, useLocalStorage } from 'usehooks-ts'

import { AppState } from '@state'
import { useLogout } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const EVENTS = ['click', 'dblclick', 'drag', 'keydown', 'load', 'scroll', 'zoom']
const IDLE_TIMER_KEY = 'sessionTTL'
const IDLE_RESET_TIMER = 5 * 900000
const IDLE_CHECK_TIMER = 300000
const IDLE_WARNING_THRESHOLD = 5 * 300000

const Context = createContext({})

export const IdleTimeOutProvider: FC<any> = ({ children }) => {
	const [IDLE_TIMER, setIdleTimer] = useLocalStorage<number>(IDLE_TIMER_KEY, Date.now())
	const { logout } = useLogout()
	const { t } = useTranslation()
	//const dispatch = useDispatch()

	const user = useSelector((state: AppState) => state.user)

	const checkIfUserIdle = useCallback(() => {
		if (IDLE_TIMER) {
			const diff = IDLE_TIMER - Date.now()
			if (diff <= 0) {
				//dispatch(setStatus({ icon: <Icon icon='error_outline' />, status: 'error', message: t('Your session has expired. Reload the page!') }))
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

	useEffectOnce(() => {
		EVENTS.forEach((event) => window.addEventListener(event, handleTimePassed))

		return () => {
			EVENTS.forEach((event) => window.removeEventListener(event, handleTimePassed))
		}
	})

	useEffect(() => {
		if (!user) {
			return
		}

		const interval = setInterval(() => {
			checkIfUserIdle()
		}, IDLE_CHECK_TIMER)

		return () => clearInterval(interval)
	}, [checkIfUserIdle, user])

	return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default Context
