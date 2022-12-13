import React, { FC, useEffect, useMemo, useCallback, useState } from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, Container, DialogActions, Grid } from '@mui/material'
import { FormikTextField, FormikSelect } from 'components'
import * as Yup from 'yup'

interface RegisterEventFormProps {
	onClose: () => void
}

const RegisterEventFormSchema = Yup.object().shape({
	eventCapacity: Yup.number().required(),
	eventIsFree: Yup.bool(),
	eventLevelRequired: Yup.number().required(),
	eventLocation: Yup.string().required(),
	eventName: Yup.string().required(),
	eventPrice: Yup.number(),
	eventType: Yup.string().required(),
})

const RegisterEventForm: FC<RegisterEventFormProps | any> = ({ onClose, ...props }) => {
	const initialValues = useMemo(
		() => ({
			eventCapacity: 16,
			eventIsFree: false,
			eventLevelRequired: 16,
			eventLocation: '',
			eventName: '',
			eventPrice: 0.0,
			eventType: '',
		}),
		[],
	)

	const onSubmit = (values) => {
		console.log('onSubmit RegisteEventForm')
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={RegisterEventFormSchema}>
			<Form noValidate>
				<Grid container direction="column">
					<Grid item container>
						<Grid item xs={8}>
							<FormikTextField label="Event name" name="eventName" placeholder="Enter event name" />
						</Grid>
						<Grid item xs={4}>
							<FormikTextField label="Event name" name="eventName" placeholder="Enter event name" />
						</Grid>
					</Grid>
					<FormikTextField label="Event name" name="eventName" placeholder="Enter event name" />
					<FormikTextField label="Event name" name="eventName" placeholder="Enter event name" />
					<FormikTextField label="Event name" name="eventName" placeholder="Enter event name" />
					<FormikTextField label="Event name" name="eventName" placeholder="Enter event name" />
				</Grid>
				<Box padding={1} mb={2}>
					<DialogActions>
						<Button size="medium" autoFocus onClick={() => onClose()}>
							Cancel
						</Button>
						<Button size="medium" variant="contained" onClick={() => {}}>
							Create
						</Button>
					</DialogActions>
				</Box>
			</Form>
		</Formik>
	)
}

export default RegisterEventForm
