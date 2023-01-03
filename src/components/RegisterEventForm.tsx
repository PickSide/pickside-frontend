import React, { FC, useEffect, useMemo, useCallback, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Button,
	Checkbox,
	DialogActions,
	FormControlLabel,
	Grid,
	MenuItem,
	TextField,
	Select,
	FormControl,
	InputAdornment,
	InputLabel,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { SelectSports } from 'widgets'
import { useTranslation } from 'react-i18next'

interface RegisterEventFormProps {
	onClose: () => void
}

type FormData = {
	name: string
	isFree: boolean
	capacity: number
	level: number
	price: number
	sport: string
}

const RegisterEventForm: FC<RegisterEventFormProps | any> = ({ onClose, ...props }) => {
	const { t } = useTranslation()
	const sports = useSelector((state: AppState) => state.sports)
	const { control, getValues, handleSubmit, watch } = useForm<FormData>({
		defaultValues: {
			name: '',
			capacity: 0,
			isFree: false,
			level: 1,
			price: 0.0,
			sport: 'default',
		},
	})
	const onSubmit = (values) => {
		console.log('onSubmit RegisteEventForm')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container direction="column" rowSpacing={2}>
				<Grid item container columnSpacing={2}>
					<Grid item xs={8}>
						<Controller
							name="name"
							control={control}
							render={({ field }) => <TextField label={t('Event Name')} fullWidth {...field} />}
						/>
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="capacity"
							control={control}
							render={({ field }) => (
								<TextField
									type="number"
									label={t('Capacity')}
									placeholder={t('Enter capacity of players')}
									fullWidth
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
							name="level"
							control={control}
							render={({ field }) => (
								<TextField
									type="number"
									label={t('Level')}
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
					<Grid item>
						<Controller
							name="isFree"
							control={control}
							render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label={t('Free')} />}
						/>
					</Grid>
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
	)
}

export default RegisterEventForm
