import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import LoginForm from '../pages/Authentication/Forms/LoginForm'
import SignUpForm from '../pages/Authentication/Forms/SignUpForm'

const Authentication: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()

	const [value, setValue] = React.useState('login')

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	return (
		<TabContext value={value}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<TabList onChange={handleChange} aria-label="lab API tabs example">
					<Tab label={t('Login')} value="login"/>
					<Tab label={t('Sign up')} value="signup" />
				</TabList>
			</Box>
			<TabPanel value="login">
				<LoginForm onClose={props.onClose} />
			</TabPanel>
			<TabPanel value="signup">
				<SignUpForm onClose={props.onClose} />
			</TabPanel>
		</TabContext>
	)
}

export default Authentication
