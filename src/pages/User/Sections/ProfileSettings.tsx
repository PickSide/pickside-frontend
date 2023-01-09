import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import { PageLayout, SettingsInput } from 'components'
import { AppState } from 'state'

const ProfileSettings = () => {
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.connectedUser)

	const AppSettingsConfigurations = useMemo(
		() => [
			{
				key: 'darkmode_permanent',
				value: 'darkmodePermanent',
				inputType: 'text',
				extraProps: {
					label: t('First name'),
					labelPlacement: 'start',
					dense: true,
					helperText: t('Set your first name'),
					sx: {
						maxWidth: 200,
					},
					defaultValue: `${connectedUser?.firstName}`,
				},
			},
			{
				key: 'darkmode_permanent',
				value: 'darkmodePermanent',
				inputType: 'text',
				extraProps: {
					label: t('Last name'),
					labelPlacement: 'start',
					dense: true,
					helperText: t('Set your last name'),
					sx: {
						maxWidth: 200,
					},
					defaultValue: `${connectedUser?.lastName}`,
				},
			},
			{
				key: 'darkmode_permanent',
				value: 'darkmodePermanent',
				inputType: 'text',
				extraProps: {
					label: t('Edit email'),
					labelPlacement: 'start',
					dense: true,
					helperText: t('Edit your email'),
					sx: {
						maxWidth: 200,
					},
					defaultValue: `${connectedUser?.email}`,
				},
			},
			{
				key: 'darkmode_permanent',
				value: 'darkmodePermanent',
				inputType: 'text',
				extraProps: {
					label: t('Level'),
					labelPlacement: 'start',
					dense: true,
					helperText: t('Edit your email'),
					sx: {
						maxWidth: 200,
					},
					defaultValue: `${connectedUser?.email}`,
				},
			},
			{
				key: 'darkmode_permanent',
				value: 'darkmodePermanent',
				inputType: 'select',
				extraProps: {
					label: t('Default sport'),
					labelPlacement: 'start',
					dense: true,
					helperText: t('Set your default sport'),
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
		],
		[connectedUser],
	)

	return (
		<PageLayout title={t('Profile settings')}>
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

export default ProfileSettings
