import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from 'hooks'
import { Switch, SettingField } from 'components'
import { AppState } from 'state'

const AppSettings = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { updateAccountSettings } = useApi()

	const connectedUser = useSelector((state: AppState) => state.account)

	const Settings = [
		{
			name: t('Hide age'),
			helperText: t('Hide your age from other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.hideAge}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hideAge: e.target.checked }))}
				/>
			),
		},
		{
			name: t('Hide email'),
			helperText: t('Hide your email from other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.hideEmail}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hideEmail: e.target.checked }))}
				/>
			),
		},
		{
			name: t('Hide phone'),
			helperText: t('Hide your phone from other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.hidePhone}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hidePhone: e.target.checked }))}
				/>
			),
		},
		{
			name: t('Hide username'),
			helperText: t('Hide your username from other users'),
			control: (
				<Switch
					defaultChecked={connectedUser?.hideUsername}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hideUsername: e.target.checked }))}
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

export default AppSettings
