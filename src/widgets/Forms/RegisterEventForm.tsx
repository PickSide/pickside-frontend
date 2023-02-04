import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Button,
	Checkbox,
	DialogActions,
	FormControlLabel,
	Grid,
	FormControl,
	InputAdornment,
	Container,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { TextField } from 'components'
import { SelectSports } from 'widgets'
import { registerSportEvent } from 'state/sportEvent'

interface RegisterEventFormProps {
	onClose: () => void
}

type FormData = {
	title: string
	sport: string
	organiser: string
	price: number
	levelRequired: number
	maxPlayersCapacity: number
	location: object
	isFree: boolean
}

const RegisterEventForm: FC<RegisterEventFormProps | any> = ({ onClose, ...props }) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { control, getValues, handleSubmit, watch } = useForm<FormData>({
		defaultValues: {
			title: '',
			sport: 'default',
			organiser: '',
			price: 0,
			levelRequired: 1,
			maxPlayersCapacity: 10,
			isFree: false,
		},
	})

	const onSubmit = (values) => {
		dispatch<any>(registerSportEvent(values))
		onClose()
	}

	return (
		<Container maxWidth="lg">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" rowSpacing={4}>
					<Grid item container columnSpacing={2}>
						<Grid item xs>
							<Controller
								name="title"
								control={control}
								render={({ field }) => <TextField label={t('Event Name')} fullWidth freeSolo {...field} />}
							/>
						</Grid>
						<Grid item xs>
							<Controller
								name="maxPlayersCapacity"
								control={control}
								render={({ field }) => (
									<TextField
										type="number"
										label={t('Capacity')}
										freeSolo
										fullWidth
										placeholder={t('Enter capacity of players')}
										{...field}
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Grid item container columnSpacing={2}>
						<Grid item xs>
							<Controller
								name="sport"
								control={control}
								render={({ field }) => (
									<FormControl fullWidth>
										<SelectSports {...field} />
									</FormControl>
								)}
							/>
						</Grid>
						<Grid item xs>
							<Controller
								name="levelRequired"
								control={control}
								render={({ field }) => (
									<TextField
										type="number"
										label={t('Level')}
										freeSolo
										placeholder={t('Choose level required for entry')}
										fullWidth
										{...field}
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Grid item container columnSpacing={2}>
						<Grid item>
							<Controller
								name="price"
								control={control}
								render={({ field }) => (
									<TextField
										disabled={watch('isFree')}
										type="number"
										label={t('Price')}
										freeSolo
										InputProps={{
											startAdornment: <InputAdornment position="start">$</InputAdornment>,
											endAdornment: <InputAdornment position="end">/ person</InputAdornment>,
										}}
										placeholder={t('Enter price')}
										fullWidth
										{...field}
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Controller
							name="isFree"
							control={control}
							render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label={t('Free')} />}
						/>
					</Grid>
				</Grid>
				<Box padding={1} mb={2}>
					<DialogActions>
						<Button size="medium" autoFocus onClick={() => onClose()}>
							{t('Cancel')}
						</Button>
						<Button type="submit" size="medium" variant="contained">
							{t('Create')}
						</Button>
					</DialogActions>
				</Box>
			</form>
		</Container>
	)
}

export default RegisterEventForm
