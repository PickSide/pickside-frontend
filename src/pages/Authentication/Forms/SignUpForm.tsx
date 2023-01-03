import React, { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, DialogActions, Grid, MenuItem, TextField, Select } from '@mui/material'
interface SignUpFormProps {
	onClose: () => void
}

type FormData = {
	username: string
	fullName: string
	email: string
	confirmEmail: string
	password: string
	confirmPassword: string
	sexe: 'male' | 'female' | undefined
}

const SignUpForm: FC<SignUpFormProps> = ({ onClose }) => {
	const onSubmit = (values: any) => console.log(`values: ${values}`)
	const { control, handleSubmit } = useForm<FormData>({
		defaultValues: {
			username: '',
			fullName: '',
			email: '',
			confirmEmail: '',
			password: '',
			confirmPassword: '',
			sexe: undefined,
		},
	})

	return (
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
						name="fullName"
						control={control}
						render={({ field }) => <TextField label="Full name" placeholder="Enter full name" fullWidth {...field} />}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="email"
						control={control}
						render={({ field }) => <TextField label="Email" placeholder="Enter email" fullWidth {...field} />}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="confirmEmail"
						control={control}
						render={({ field }) => <TextField label="Confirm email" placeholder="Confirm email" fullWidth {...field} />}
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
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<TextField label="Confirm password" placeholder="Confirm password" fullWidth {...field} />
						)}
					/>
				</Grid>
				<Grid item>
					<Controller
						name="sexe"
						control={control}
						render={({ field }) => (
							<Select label="Sexe" defaultValue="DEFAULT" placeholder="Sexe" fullWidth {...field}>
								<MenuItem value="DEFAULT">Sexe</MenuItem>
								<MenuItem key="male" value="male">
									Male
								</MenuItem>
								<MenuItem key="female" value="female">
									Female
								</MenuItem>
							</Select>
						)}
					/>
				</Grid>

				<Grid item>
					<DialogActions>
						<Button onClick={() => onClose()}>Cancel</Button>
						<Button type="submit">Register</Button>
					</DialogActions>
				</Grid>
			</Grid>
		</form>
	)
}

export default SignUpForm
