import { SettingField, Switch } from '@components'

import { AppState } from '@state'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUpdateSetting } from '@hooks'

const Privacy = () => {
	const { t } = useTranslation()
	const { updateUser } = useUpdateSetting()

	const me = useSelector((state: AppState) => state.user)

	const Settings = [
		{
			name: t('Display your age'),
			helperText: t('Display your age to other users'),
			control: (
				<Switch
					defaultChecked={me?.showAge}
					onChange={(e) => updateUser({ showAge: e.target.checked })}
				/>
			),
		},
		{
			name: t('Display your email'),
			helperText: t('Display your email to other users'),
			control: (
				<Switch
					defaultChecked={me?.showEmail}
					onChange={(e) => updateUser({ showEmail: e.target.checked })}
				/>
			),
		},
		{
			name: t('Display your phone'),
			helperText: t('Display your phone to other users'),
			control: (
				<Switch
					defaultChecked={me?.showPhone}
					onChange={(e) => updateUser({ showPhone: e.target.checked })}
				/>
			),
		},
		{
			name: t('Display your group(s)'),
			helperText: t('Display your group(s) to other users'),
			control: (
				<Switch
					defaultChecked={me?.showGroups}
					onChange={(e) => updateUser({ showGroups: e.target.checked })}
				/>
			),
		},
		{
			name: t('Allow location tracking your group'),
			helperText: t('Let the app track your location'),
			control: (
				<Switch
					defaultChecked={me?.allowLocationTracking}
					onChange={(e) => updateUser({ allowLocationTracking: e.target.checked })}
				/>
			),
		},
	]

	return (
		<div className="flex flex-col gap-y-6">
			{Settings.map(({ name, helperText, control }, idx) => (
				<SettingField key={idx} settingName={name} helperText={helperText}>
					{control}
				</SettingField>
			))}
		</div>
	)
}

export default Privacy
