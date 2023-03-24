import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { LoginForm, SignUpForm } from 'widgets'

const Authentication: FC<any> = ({ ...props }) => {
	const { t } = useTranslation()

	const [value, setValue] = useState('login')

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}

	return (
		<TabContext value={value}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<TabList onChange={handleChange} aria-label="lab API tabs example">
					<Tab label={t('Login')} value="login" />
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
