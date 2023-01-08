import { Grid } from '@mui/material'
import { PageLayout, SettingsInput } from 'components'
import { useTranslation } from 'react-i18next'

const AppSettings = () => {
	const AppSettingsConfigurations = [
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			inputType: 'switch',
			extraProps: {
				label: 'Default theme',
				labelPlacement: 'start',
				dense: true,
				helperText: 'Select the default theme for your application.',
			},
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			inputType: 'switch',
			extraProps: {
				label: 'Allow location tracking',
				labelPlacement: 'start',
				dense: true,
				helperText: 'Allow the app to track your location.',
			},
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			inputType: 'select',
			extraProps: {
				label: 'Set default location',
				labelPlacement: 'start',
				dense: true,
				helperText: 'Select the default theme for your application.',
			},
		},
		// {
		// 	key: 'darkmode_permanent',
		// 	value: 'darkmodePermanent',
		// 	inputType: 'switch',
		// 	extraProps: {
		// 		label: 'Default theme',
		// 		labelPlacement: 'start',
		// 		dense: true,
		// 		helperText: 'Select the default theme for your application.',
		// 	},
		// },
		// {
		// 	key: 'darkmode_permanent',
		// 	value: 'darkmodePermanent',
		// 	inputType: 'switch',
		// 	extraProps: {
		// 		label: 'Default theme',
		// 		labelPlacement: 'start',
		// 		dense: true,
		// 		helperText: 'Select the default theme for your application.',
		// 	},
		// },
	]

	const { t } = useTranslation()

	return (
		<PageLayout title={t('App settings')}>
			<Grid container direction="column">
				{AppSettingsConfigurations.map((config, idx) => (
					<Grid item key={idx}>
						<SettingsInput type={config.inputType} extraProps={config.extraProps} />
					</Grid>
				))}
			</Grid>
		</PageLayout>
	)
}

export default AppSettings
