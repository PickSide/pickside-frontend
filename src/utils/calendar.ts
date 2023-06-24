import dayjs from 'dayjs'

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {

    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month')
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month')

    const arrayOfDate: any = []

    //create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
        const date = firstDateOfMonth.day(i)

        arrayOfDate.push({
            currentMonth: false,
            date
        })
    }

    //generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today:
                firstDateOfMonth.date(i).toDate().toDateString() ===
                dayjs().toDate().toDateString(),
            afterToday: firstDateOfMonth.date(i) > dayjs()
        });
    }

    const remaining = 42 - arrayOfDate.length

    //create suffix date
    for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.date(i),
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