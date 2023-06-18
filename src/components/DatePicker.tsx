import { useState, forwardRef } from 'react'
import { MdOutlineChevronLeft, MdOutlineChevronRight, MdCalendarToday } from 'react-icons/md'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { generateDate, weeks, months, dropdownAnimation } from 'utils'

const DatePicker = ({ value = dayjs(), onChange, ...rest }, ref) => {
	const [today, setToday] = useState<dayjs.Dayjs>(value)
	const [selectDate, setSelectDate] = useState<dayjs.Dayjs>(value)
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = () => setOpen(true)
	const handleSelect = (date) => {
		setSelectDate(date)
		onChange(date)
		setOpen(false)
	}

	return (
		<div className="relative" tabIndex={0}>
			<button
				type="button"
				className="flex gap-x-3 items-center cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
				onClick={handleOpen}
				aria-haspopup="listbox"
				aria-expanded="true"
				aria-labelledby="listbox-label"
			>
				<span className="flex items-center">
					<MdCalendarToday size={20} />
				</span>
				<span className="flex flex-col items-start justify-center">
					<span className="text-[10px] text-[#A2A2A2] leading-4">Choose date</span>
					<span className="font-semibold">{selectDate?.toDate().toDateString()}</span>
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
							className="absolute z-[90] mt-1 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						>
							{/* <div className="flex items-center h-12 gap-x-3 p-3">
								<button className="bg-gray-100 rounded-md border-none p-2 font-semibold hover:bg-gray-200 ease-in transition-all duration-75">
									Today
								</button>
								<button className="bg-gray-100 rounded-md border-none p-2 font-semibold hover:bg-gray-200">
									Tomorrow
								</button>
							</div> */}
							<div className="flex justify-between px-4">
								<button
									type="button"
									disabled={today.month() <= 0}
									className="rounded-md hover:bg-gray-200 shadow-sm outline-none font-primary m-2 p-1"
									onClick={() => setToday(today.month(today.month() - 1))}
								>
									<MdOutlineChevronLeft size={15} />
								</button>
								<span className="rounded-full text-[15px] hover:bg-gray-200 border-none outline-none font-primary m-2 p-1">
									{months[today.month()]}
								</span>
								<button
									type="button"
									disabled={today.month() >= 11}
									className="rounded-md hover:bg-gray-200 shadow-sm outline-none font-primary m-2 p-1"
									onClick={() => setToday(today.month(today.month() + 1))}
								>
									<MdOutlineChevronRight size={15} />
								</button>
							</div>
							<div className="grid grid-cols-7 p-2 text-center">
								{weeks.map((week, idx) => (
									<span key={idx} className="text-gray-300 text-[10px]">
										{week}
									</span>
								))}
							</div>
							<div className="grid grid-cols-7 p-2 text-center text-[12px]">
								{generateDate(today.month(), today.year()).map(({ date, currentMonth, today, afterToday }, idx) =>
									today ? (
										<button
											type="button"
											key={idx}
											className="rounded-md block w-6 h-6 pointer-events-none bg-indigo-500 text-white border-none outline-none font-primary m-2"
										>
											{date.date()}
										</button>
									) : selectDate?.toDate().toDateString() === date.toDate().toDateString() ? (
										<button
											type="button"
											key={idx}
											disabled={true}
											onClick={() => handleSelect(date)}
											className="rounded-md block w-6 h-6 pointer-events-none bg-emerald-600 text-white border-none outline-none font-primary m-2"
										>
											{date.date()}
										</button>
									) : (
										<button
											type="button"
											key={idx}
											disabled={!currentMonth || !afterToday}
											onClick={() => handleSelect(date)}
											className="rounded-md block w-6 h-6 hover:bg-gray-200 border-none outline-none font-primary m-2 disabled:text-gray-300 disabled:pointer-events-none"
										>
											{date.date()}
										</button>
									),
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}

export default forwardRef(DatePicker)
