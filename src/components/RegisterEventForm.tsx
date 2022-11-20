import React, { FC, useEffect, useMemo, useCallback, useState } from 'react'
import { Formik, Form } from 'formik'
import { Grid } from '@mui/material'
import { FormikTextField, FormikSelect } from 'components'
import * as Yup from 'yup'

const RegisterEventFormSchema = Yup.object().shape({
	eventCapacity: Yup.number().required(),
	eventIsFree: Yup.bool(),
	eventLevelRequired: Yup.number().required(),
	eventLocation: Yup.string().required(),
	eventName: Yup.string().required(),
	eventPrice: Yup.number(),
	eventType: Yup.string().required(),
})

const RegisterEventForm: FC<any> = ({ ...props }) => {
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
			</Form>
		</Formik>
	)
}

export default RegisterEventForm
