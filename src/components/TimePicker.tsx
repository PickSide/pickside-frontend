import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, forwardRef, useId, useState } from 'react'

import { MdAccessTime } from 'react-icons/md'
import { dropdownAnimation } from '@utils'
import moment from 'moment'
import { times } from 'lodash'

const TimePicker = ({ onChange, ...rest }, ref) => {
	const id = useId()
	const [selectedTime, setSelectedTime] = useState<any>(moment())
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleClick = (value) => {
		setSelectedTime(value)
		onChange(value)
		handleClose()
	}

	return (
		<div className="relative" tabIndex={0}>
			<label htmlFor={id} className="text-gray-800 leading-4">
				{rest.label}
			</label>
			<button
				id={id}
				type="button"
				className="flex gap-x-3 items-center cursor-default rounded-lg h-[50px] w-full py-1.5 pl-3 pr-10 text-left text-gray-600 shadow-sm ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
				onClick={handleOpen}
				aria-haspopup="listbox"
				aria-expanded="true"
				aria-labelledby="listbox-label"
			>
				<span className="flex items-center">
					<MdAccessTime size={20} />
				</span>
				<span className="flex flex-col items-start justify-center">
					<span className="font-semibold">{selectedTime.format('LT')}</span>
				</span>
			</button>
			<AnimatePresence mode="wait">
				{open && (
					<>
						<div className="fixed inset-0 z-50" onClick={() => handleClose()}></div>
						<motion.div
							variants={dropdownAnimation}
							initial="closed"
							animate="open"
							exit="exit"
							className="absolute z-[90] max-h-48 lg:max-h-72 overflow-y-scroll w-full p-3 mt-1 flex gap-x-2 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						>
							<div className="flex flex-col justify-start w-full">
								{times(24, (hour) => {
									const momentObj = moment().startOf('hour').hour(hour)
									return (
										<Fragment key={hour}>
											<button
												type="button"
												onClick={() => handleClick(momentObj)}
												className="text-[#B8C0C8] border-none bg-none outline-none my-1 hover:text-primary hover:font-semibold ease-in transition-all duration-75"
											>
												{moment().startOf('hour').hour(hour).format('LT')}
											</button>
											<button
												type="button"
												onClick={() => handleClick(momentObj.add(30, 'minutes'))}
												className="text-[#B8C0C8] border-none bg-none outline-none my-1 hover:text-primary hover:font-semibold ease-in transition-all duration-75"
											>
												{moment().startOf('hour').hour(hour).add(30, 'minutes').format('LT')}
											</button>
										</Fragment>
									)
								})}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default forwardRef(TimePicker)
