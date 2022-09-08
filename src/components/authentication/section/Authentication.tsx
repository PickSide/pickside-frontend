import React, { FC } from 'react'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import LoginForm from '../../forms/LoginForm'
import SignUpForm from '../../forms/SignUpForm'

const Authentication: FC<any> = ({ ...props }) => {
	const [value, setValue] = React.useState('login')

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	return (
		<>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Login" value="login" />
						<Tab label="SignUp" value="signup" />
					</TabList>
				</Box>
				<TabPanel value="login">
					<LoginForm onClose={props.onClose} />
				</TabPanel>
				<TabPanel value="signup">
					<SignUpForm onClose={props.onClose} />
				</TabPanel>
			</TabContext>
		</>
	)
}

export default Authentication
