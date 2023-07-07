import { SettingField, Switch } from 'components'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from 'state'
import { useApi } from 'hooks'
import { useTranslation } from 'react-i18next'

const Privacy = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { updateUser } = useApi()

	const connectedUser = useSelector((state: AppState) => state.user)

	const Settings = [
		{
			name: t('Display your age'),
			helperText: t('Display your age to other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.profilePrivacy?.showAge}
					onChange={(e) => dispatch<any>(updateUser({ profilePrivacy: { showAge: e.target.checked } }))}
				/>
			),
		},
		{
			name: t('Display your email'),
			helperText: t('Display your email to other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.profilePrivacy?.showEmail}
					onChange={(e) => dispatch<any>(updateUser({ profilePrivacy: { showEmail: e.target.checked } }))}
				/>
			),
		},
		{
			name: t('Display your phone'),
			helperText: t('Display your phone to other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.profilePrivacy?.showPhone}
					onChange={(e) => dispatch<any>(updateUser({ profilePrivacy: { showPhone: e.target.checked } }))}
				/>
			),
		},
		{
			name: t('Display your group(s)'),
			helperText: t('Display your group(s) to other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.profilePrivacy?.showGroups}
					onChange={(e) => dispatch<any>(updateUser({ profilePrivacy: { showGroups: e.target.checked } }))}
				/>
			),
		},
		{
			name: t('Allow location tracking your group()'),
			helperText: t('Let the app track your location'),
			control: (
				<Switch
					defaultChecked={connectedUser?.profilePrivacy?.allowLocationTracking}
					onChange={(e) => dispatch<any>(updateUser({ profilePrivacy: { allowLocationTracking: e.target.checked } }))}
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