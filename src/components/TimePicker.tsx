import { forwardRef, useId, useState } from 'react'
import { MdAccessTime } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import { times } from 'lodash'
import moment from 'moment'
import dayjs from 'dayjs'

const TimePicker = ({ ...rest }, ref) => {
	const id = useId()
	const [today, setToday] = useState<any>(rest.value)
	const [selectTime, setSelectTime] = useState<any>(rest.value)
	const [selectedDaytime, setSelectedDaytime] = useState<string>('am')
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return (
		<div className="relative" tabIndex={0} onBlur={handleClose}>
			<button
				id={id}
				type="button"
				className="flex gap-x-3 items-center cursor-default rounded-lg bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
				onClick={handleOpen}
				aria-haspopup="listbox"
				aria-expanded="true"
				aria-labelledby="listbox-label"
			>
				<span className="flex items-center">
					<MdAccessTime size={20} />
				</span>
				<span className="flex flex-col items-start justify-center">
					<span className="text-[10px] text-[#A2A2A2] leading-4">Choose time</span>
					<span className="font-semibold">{moment().format('LT')}</span>
				</span>
			</button>
			<AnimatePresence mode="wait">
				{open && (
					<>
						<div className="fixed inset-0 z-50" onClick={() => setOpen(false)}></div>
						<motion.div
							variants={dropdownAnimation}
							initial="closed"
							animate="open"
							exit="exit"
							className="absolute z-[90] max-h-72 overflow-y-scroll w-full p-3 mt-1 flex gap-x-2 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						>
							<div className="flex flex-col w-full">
								{times(dayjs().endOf('day').hour(), (hour, idx) => (
									<button
										key={idx}
										type="button"
										onClick={(hour) => setSelectTime(hour)}
										className={`text-[#B8C0C8] border-none bg-none outline-none my-1 hover:text-indigo-500 hover:font-semibold ease-in transition-all duration-75`}
									>
										{hour + 1}:00 {hour < 11 ? 'AM' : 'PM'}
									</button>
								))}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default forwardRef(TimePicker)
