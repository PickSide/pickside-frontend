import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsX } from 'react-icons/bs'

import { Alert, Button, IconButton } from 'components'
import { AppState, setStatus } from 'state'
import { AnimatePresence } from 'framer-motion'

const GlobalAppStatusAlert: FC<any> = () => {
	const dispatch = useDispatch()

	const appStatus = useSelector((state: AppState) => state.appStatus)

	return (
		<AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
			{!!appStatus && (
				<div className="fixed z-[200] w-full xl:w-fit xl:left-1/2 xl:-translate-x-1/2">
					<Alert
						severity={appStatus?.status}
						action={<IconButton className='text-white' onClick={() => dispatch<any>(setStatus(null))} icon={<BsX size={25} />} />}
					>
						<span>{appStatus?.message}</span>
					</Alert>
				</div>
			)}
		</AnimatePresence>
	)
}

export default GlobalAppStatusAlert