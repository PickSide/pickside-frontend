import { createContext, useContext, FC, ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'widgets'
import { AppState, toastMessage } from 'state'

export interface ToastContextProps {
	children?: ReactNode
	triggerToast?: Function
}

const ToastContext = createContext<ToastContextProps>({
	triggerToast: () => {},
})

export const useThemeContext = () => useContext(ToastContext)

export const ToastProvider: FC<any> = ({ children }) => {
	const dispatch = useDispatch()

	const toast = useSelector((state: AppState) => state.toast)

	useEffect(() => {
		const timer = setTimeout(() => dispatch<any>(toastMessage(null)), 5000)
		return () => clearTimeout(timer)
	}, [dispatch, toast])

	return (
		<ToastContext.Provider value={{}}>
			{children}
			<div className="fixed bottom-5 left-5">
				<Toast type={toast?.type} show={!!toast} onClose={() => dispatch<any>(toastMessage(null))}>
					{toast?.message}
				</Toast>
			</div>
		</ToastContext.Provider>
	)
}

export default ToastContext