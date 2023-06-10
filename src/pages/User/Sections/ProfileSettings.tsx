import { useState } from 'react'
import { SettingField, Switch, Select, ToggleGroup, TextField, Button, Dialog, Chip } from 'components'
import { useAsync } from 'react-use'
import { useApi, useCalls } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { AppState, Area } from 'state'
import { MdDarkMode } from 'react-icons/md'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { orderBy } from 'lodash'

const ProfileSettings = () => {
	const { t } = useTranslation()

	const connectedUser = useSelector((state: AppState) => state.account)
	const areas = useSelector((state: AppState) => state.areas)

	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)
	// level, hide age, hide email
	return (
		<>
			<Dialog
				title={t('Change password')}
				open={openPasswordChangeDialog}
				onClose={() => setOpenPasswordChangeDialog(false)}
			>
				<TextField label="Old password" isPassword />
				<TextField label="New password" isPassword />
				<TextField label="Confirm new password" isPassword />
			</Dialog>
			<div className="flex flex-col gap-y-6">
				<SettingField settingName="Username" readOnly>
					<TextField defaultValue={connectedUser?.username} />
				</SettingField>
				<SettingField settingName="Email">
					<TextField defaultValue={connectedUser?.email} />
				</SettingField>
				<SettingField settingName="Phone">
					<TextField defaultValue="" />
				</SettingField>
				<SettingField settingName="Password" helperText="" readOnly>
					<Button
						className="flex whitespace-nowrap gap-x-4 text-[13px] items-center"
						onClick={() => setOpenPasswordChangeDialog(true)}
					>
						{t('Change')} <FaExternalLinkAlt size={15} />
					</Button>
				</SettingField>
				<SettingField settingName="Sexe" helperText="Select your default language">
					<ToggleGroup
						options={[
							{ text: 'Male', defaultChecked: connectedUser?.profile?.sexe === 'male', name: 'male' },
							{ text: 'Female', defaultChecked: connectedUser?.profile?.sexe === 'female', name: 'female' },
						]}
						onChange={(option) => console.log(option)}
					/>
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
				<SettingField settingName="Fitness level" helperText="Set your fitness level (this is not your sport level)">
					<div className="flex space-x-4">
						<Chip label="Retired" />
						<Chip label="Average" />
						<Chip label="Athletic" />
						<Chip label="Very athetlic" />
					</div>
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
				<SettingField settingName="Hide username" helperText="Hide your username from people">
					<Switch />
				</SettingField>
				<SettingField settingName="Hide age" helperText="Hide your age from people">
					<Switch />
				</SettingField>
			</div>
		</>
	)
}

export default ProfileSettings
