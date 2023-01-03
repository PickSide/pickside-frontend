import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Button, DialogActions, Grid, TextField } from '@mui/material'
import { connectToPlatform } from 'state/user'
import { useDispatch } from 'react-redux'

interface LoginFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	password: string
}

const LoginForm: FC<LoginFormProps> = ({ onClose }) => {
	const dispatch = useDispatch()
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = (values: any) => {
		dispatch<any>(connectToPlatform(values))
		onClose()
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container direction="column" rowSpacing={3}>
					<Grid item>
						<Controller
							name="username"
							control={control}
							render={({ field }) => <TextField label="Username" placeholder="Enter username" fullWidth {...field} />}
						/>
					</Grid>
					<Grid item>
						<Controller
							name="password"
							control={control}
							render={({ field }) => <TextField label="Password" placeholder="Enter password" fullWidth {...field} />}
						/>
					</Grid>

					<Grid item>
						<DialogActions>
							<Button onClick={() => onClose()}>Cancel</Button>
							<Button type="submit">Login</Button>
						</DialogActions>
					</Grid>
				</Grid>
			</form>
		</>
	)
}

export default LoginForm
