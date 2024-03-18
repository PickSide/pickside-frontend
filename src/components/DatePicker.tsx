import { AnimatePresence, motion } from 'framer-motion'
import { dropdownAnimation, generateDate, months, weeks } from '@utils'
import { forwardRef, useId, useState } from 'react'

import Icon from './shared/Icon'
import InputField from './shared/InputField'
import { cn } from '@utils'
import dayjs from 'dayjs'

const DatePicker = ({ value = dayjs(), fullWidth = false, ...rest }, ref) => {
	const [today, setToday] = useState<dayjs.Dayjs>(value)
	const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(value)
	const [open, setOpen] = useState<boolean>(false)

	const id = useId()

	const openCalendar = () => setOpen(true)
	const closeCalendar = () => setOpen(false)

	const handleSelect = (date) => {
		setSelectedDate(date)
		if (rest.onChange) {
			rest.onChange(date)
		}
		setOpen(false)
	}

	return (
		<div className={cn('relative', fullWidth ? 'w-full' : 'max-w-[230px]')} tabIndex={0}>
			<InputField
				startContent={<Icon icon='calendar_today' />}
				onFocus={openCalendar}
				onBlur={closeCalendar}
				value={selectedDate?.toDate().toDateString()}
				ref={ref}
				{...rest}
			/>
			<AnimatePresence mode="wait">
				{open && (
					<>
						<div className="fixed inset-0 z-50" onClick={() => setOpen(false)}></div>
						<motion.div
							variants={dropdownAnimation}
							initial="closed"
							animate="open"
							exit="exit"
							className="absolute z-50 mt-1 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						>
							<div className="flex justify-between px-4">
								<button
									type="button"
									disabled={today.month() <= 0}
									className="rounded-md hover:bg-gray-200 shadow-sm outline-none font-ocean m-2 p-1"
									onClick={() => setToday(today.month(today.month() - 1))}
								>
									<Icon icon='keyboard_arrow_left' />
								</button>
								<span className="rounded-full text-base hover:bg-gray-200 border-none outline-none font-ocean m-2 p-1">
									{months[today.month()]}
								</span>
								<button
									type="button"
									disabled={today.month() >= 11}
									className="rounded-md hover:bg-gray-200 shadow-sm outline-none font-ocean m-2 p-1"
									onClick={() => setToday(today.month(today.month() + 1))}
								>
									<Icon icon='keyboard_arrow_right' />
								</button>
							</div>
							<div className="grid grid-cols-7 p-2 text-center">
								{weeks.map((week, idx) => (
									<span key={idx} className="text-md text-charcoal-black font-semibold">
										{week}
									</span>
								))}
							</div>
							<div className="grid grid-cols-7 p-2 text-center text-sm">
								{generateDate(today.month(), today.year()).map(({ date, currentMonth, today, afterToday }, idx) =>
									today ? (
										<button
											type="button"
											key={idx}
											className="rounded-full block w-6 h-6 pointer-events-none bg-ocean text-white border-none outline-none font-ocean m-2"
										>
											{date.date()}
										</button>
									) : selectedDate?.toDate().toDateString() === date.toDate().toDateString() ? (
										<button
											type="button"
											key={idx}
											disabled={true}
											onClick={() => handleSelect(date)}
											className="rounded-full block w-6 h-6 pointer-events-none bg-emerald-600 text-white border-none outline-none font-ocean m-2"
										>
											{date.date()}
										</button>
									) : (
										<button
											type="button"
											key={idx}
											disabled={!currentMonth || !afterToday}
											onClick={() => handleSelect(date)}
											className="rounded-full block w-6 h-6 hover:bg-gray-200 border-none outline-none font-ocean m-2 disabled:text-gray-300 disabled:pointer-events-none"
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
