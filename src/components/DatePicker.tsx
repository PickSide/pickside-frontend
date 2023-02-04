import { useState } from 'react'
import { Dayjs } from 'dayjs'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTranslation } from 'react-i18next'

const DatePicker = ({ ...props }) => {
	const { t } = useTranslation()
	const [value, setValue] = useState<Dayjs | null>(null)

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<MuiDatePicker
				label={t('Select a date')}
				value={value}
				onChange={(newValue) => {
					setValue(newValue)
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	)
}

export default DatePicker
