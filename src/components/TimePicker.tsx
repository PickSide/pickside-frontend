import { forwardRef, useState } from 'react'
import { MdAccessTime } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation } from 'utils'
import moment from 'moment'

interface DatePickerProps {
	value?: any
	onChange?: (o) => void
}

const TimePicker = ({ value, onChange }: DatePickerProps, ref) => {
	const [today, setToday] = useState<any>(value)
	const [selectTime, setSelectTime] = useState<any>(value)
	const [selectedDaytime, setSelectedDaytime] = useState<string>('am')
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	console.log(moment().format('LT'))
	return (
		<>
			<div className="relative z-[50]" tabIndex={0} onBlur={handleClose}>
				<button
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
							<motion.div
								variants={dropdownAnimation}
								initial="closed"
								animate="open"
								exit="exit"
								className="max-h-40 overflow-y-scroll w-fit absolute p-3 mt-1 flex gap-x-2 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
							>
								<div className="flex flex-col w-full">
									{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((time, idx) => (
										<button
											key={idx}
											className={`text-[#B8C0C8] border-none bg-none outline-none my-1 hover:text-indigo-500 hover:font-semibold ease-in transition-all duration-75`}
										>
											{time + 1}:00
										</button>
									))}
								</div>
								<div className="flex flex-col w-full items-center">
									{['am', 'pm'].map((daytime, idx) => (
										<button
											key={idx}
											onClick={() => setSelectedDaytime(daytime)}
											className={` my-1 w-8 h-6 text-[10px] p-auto align-middle rounded-md uppercase ease-in transition-all duration-75 border-2 ${
												selectedDaytime === daytime
													? 'border-indigo-500 bg-indigo-500 text-white'
													: 'border-[#B8C0C8] bg-none text-[#B8C0C8]'
											}`}
										>
											{daytime}
										</button>
									))}
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>
		</>
	)
}

export default forwardRef(TimePicker)
