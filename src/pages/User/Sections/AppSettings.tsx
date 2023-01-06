import { Container, FormControl, FormLabel, FormGroup, FormControlLabel } from '@mui/material'
import { Switch } from 'components'

const AppSettings = () => {
	const AppSettingsConfigurations = [
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			label: 'Default mode',
			helperText: 'Select the default theme for your application.',
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			label: 'Default mode',
			helperText: 'Select the default theme for your application.',
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			label: 'Default mode',
			helperText: 'Select the default theme for your application.',
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			label: 'Default mode',
			helperText: 'Select the default theme for your application.',
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			label: 'Default mode',
			helperText: 'Select the default theme for your application.',
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			label: 'Default mode',
			helperText: 'Select the default theme for your application.',
		},
	]
	return (
		<Container fixed>
			<FormControl component="fieldset">
				<FormLabel component="legend">Label placement</FormLabel>
				<FormGroup aria-label="position">
					{AppSettingsConfigurations.map((config, idx) => (
						<FormControlLabel
							key={idx}
							value="top"
							control={<Switch color="primary" dense />}
							label={config.label}
							labelPlacement="start"
						/>
					))}
				</FormGroup>
			</FormControl>
		</Container>
	)
}

export default AppSettings
