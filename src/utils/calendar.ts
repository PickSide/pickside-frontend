import moment from 'moment'

export const generateDate = (month = moment().month(), year = moment().year()) => {
	const firstDateOfMonth = moment().year(year).month(month).startOf('month')
	const lastDateOfMonth = moment().year(year).month(month).endOf('month')

	const arrayOfDate: any = []

	// Create prefix dates
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		const date = firstDateOfMonth.clone().day(i)

		arrayOfDate.push({
			currentMonth: false,
			date,
		})
	}

	// Generate current month dates
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDate.push({
			currentMonth: true,
			date: firstDateOfMonth.clone().date(i),
			today: firstDateOfMonth.clone().date(i).toDate().toDateString() === moment().toDate().toDateString(),
			afterToday: firstDateOfMonth.clone().date(i).isAfter(moment()),
		})
	}

	const remaining = 42 - arrayOfDate.length

	// Create suffix dates
	for (let i = 1; i <= remaining; i++) {
		arrayOfDate.push({
			currentMonth: false,
			date: lastDateOfMonth.clone().add(i, 'days'),
		})
	}

	return arrayOfDate
}

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export const weeks = ['Su', 'Mon', 'Tu', 'We', 'Th', 'Fr', 'Sa']
