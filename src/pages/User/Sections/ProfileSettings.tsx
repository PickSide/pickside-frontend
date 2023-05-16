import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { SettingsInput } from 'components'
import { AppState } from 'state'

const ProfileSettings = () => {
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.account)

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
					defaultValue: `${connectedUser?.profile?.firstName}`,
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
					defaultValue: `${connectedUser?.profile?.lastName}`,
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
		[connectedUser, t],
	)

	return (
		<div className="flex flex-col">
			<span>{t('Profile settings')}</span>
			{AppSettingsConfigurations.map((config, idx) => (
				<SettingsInput type={config.inputType} extraProps={config.extraProps} />
			))}
		</div>
	)
}

export default ProfileSettings
