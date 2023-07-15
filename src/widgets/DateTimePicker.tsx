import { DatePicker, TimePicker } from 'components'

import { useState } from 'react'

const DateTimePicker = ({}) => {
	const [] = useState()

	const DateSelector = () => <DatePicker />
	const TimeSelector = () => <TimePicker />

	return { DateSelector, TimeSelector }
}

export default DateTimePicker
