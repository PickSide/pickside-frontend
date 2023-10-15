import { AppState, setStatus } from '@state'
import { useDispatch, useSelector } from 'react-redux'

import Alert from './shared/Alert'
import { AnimatePresence } from 'framer-motion'
import { BsX } from 'react-icons/bs'
import { FC } from 'react'
import IconButton from './shared/IconButton'

const GlobalAppStatusAlert: FC<any> = () => {
	const dispatch = useDispatch()

	const appStatus = useSelector((state: AppState) => state.appStatus)

	return (
		<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
			{!!appStatus && (
				<div className="fixed z-50 w-full xl:w-fit xl:left-1/2 xl:-translate-x-1/2">
					<Alert
						severity={appStatus?.status}
						action={
							<IconButton className="text-white" onClick={() => dispatch(setStatus(null))} icon={<BsX size={25} />} />
						}
					>
						<span>{appStatus?.message}</span>
					</Alert>
				</div>
			)}
		</AnimatePresence>
	)
}

export default GlobalAppStatusAlert
