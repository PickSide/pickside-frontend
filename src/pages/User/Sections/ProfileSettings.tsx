import { useMemo } from 'react'
import { SettingField, Switch, Select, ToggleGroup, TextField } from 'components'
import { useAsync } from 'react-use'
import { useApi, useCalls } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AppState, Area } from 'state'
import { MdDarkMode } from 'react-icons/md'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { orderBy } from 'lodash'

const ProfileSettings = () => {
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.account)
	const areas = useSelector((state: AppState) => state.areas)

	return (
		<div className="flex flex-col gap-y-6">
			<SettingField settingName="Username" helperText="See your usename" readOnly>
				<TextField defaultValue={connectedUser?.username} />
			</SettingField>
			<SettingField settingName="Password" helperText="" readOnly>
				<TextField defaultValue={connectedUser?.username} />
			</SettingField>
			<SettingField settingName="Default mode" helperText="Set your default mode">
				<ToggleGroup
					options={[
						{ icon: <HiOutlineLightBulb size={20} />, defaultChecked: true, name: 'lightmode' },
						{ icon: <MdDarkMode size={20} />, name: 'darkmode' },
					]}
					onChange={(option) => console.log(option)}
				/>
			</SettingField>
			<SettingField settingName="Preferred language" helperText="Select your default language">
				<ToggleGroup
					options={[
						{ text: 'FR', defaultChecked: connectedUser?.configs?.defaultLanguage === 'fr', name: 'fr' },
						{ text: 'EN', defaultChecked: connectedUser?.configs?.defaultLanguage === 'en', name: 'en' },
					]}
					onChange={(option) => console.log(option)}
				/>
			</SettingField>
			<SettingField
				settingName="Preferred region"
				helperText="Set your default region (this will set the map to the location you choose)"
			>
				<Select
					placeholder={t('Select region')}
					options={orderBy<Area>(areas?.results, ['city', 'country', 'state'], ['asc', 'desc'])}
					getOptionLabel={(option) => option?.district.join(' / ')}
					onChange={(value) => console.log(value)}
				/>
			</SettingField>
			<SettingField settingName="Default dark mode" helperText="Set your default mode">
				<Switch />
			</SettingField>
			<SettingField settingName="Default dark mode" helperText="Set your default mode">
				<Switch />
			</SettingField>
		</div>
	)
}

export default ProfileSettings
