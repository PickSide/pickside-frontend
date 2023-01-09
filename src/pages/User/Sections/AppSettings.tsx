import { Grid } from '@mui/material'
import { PageLayout, SettingsInput } from 'components'
import { useTranslation } from 'react-i18next'

const AppSettings = () => {
	const { t } = useTranslation()

	const AppSettingsConfigurations = [
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			inputType: 'switch',
			extraProps: {
				label: t('Default theme'),
				labelPlacement: 'start',
				dense: true,
				helperText: t('Select the default theme for your application.'),
			},
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			inputType: 'switch',
			extraProps: {
				label: t('Allow location tracking'),
				labelPlacement: 'start',
				dense: true,
				helperText: t('Allow the app to track your location.'),
			},
		},
		{
			key: 'darkmode_permanent',
			value: 'darkmodePermanent',
			inputType: 'select',
			extraProps: {
				label: t('Set default location'),
				labelPlacement: 'start',
				dense: true,
				helperText: t('Select the default theme for your application.'),
			},
		},
	]

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
