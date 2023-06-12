import { useState } from 'react'
import {
	SettingField,
	Switch,
	Select,
	PhoneField,
	ToggleGroup,
	TextField,
	Button,
	Dialog,
	Chip,
	EditField,
	EmailField,
} from 'components'
import { useAsync } from 'react-use'
import { useApi, useCalls } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, Area } from 'state'
import { MdDarkMode } from 'react-icons/md'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { orderBy } from 'lodash'
import { useForm } from 'react-hook-form'

const ProfileSettings = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { register } = useForm()
	const { updateAccountSettings } = useApi()
	const connectedUser = useSelector((state: AppState) => state.account)
	const areas = useSelector((state: AppState) => state.areas)

	const [openEmailChangeDialog, setOpenEmailChangeDialog] = useState<boolean>(false)
	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)
	const [openPhoneChangeDialog, setOpenPhoneChangeDialog] = useState<boolean>(false)

	const Settings = [
		{
			name: t('Email'),
			control: <EditField value={connectedUser?.email} onClick={() => setOpenEmailChangeDialog(true)} />,
		},
		{
			name: t('Phone'),
			control: <EditField value={connectedUser?.phone} onClick={() => setOpenPhoneChangeDialog(true)} />,
		},
		{
			name: t('Username'),
			readOnly: true,
			control: <TextField defaultValue={connectedUser?.username} />,
		},
		{
			name: t('Password'),
			readOnly: true,
			control: (
				<Button
					className="flex whitespace-nowrap gap-x-4 text-[13px] items-center"
					onClick={() => setOpenPasswordChangeDialog(true)}
				>
					{t('Change')} <FaExternalLinkAlt size={15} />
				</Button>
			),
		},
		{
			name: t('Sexe'),
			control: (
				<ToggleGroup
					options={[
						{ text: 'Male', defaultChecked: connectedUser?.sexe === 'male', name: 'male' },
						{ text: 'Female', defaultChecked: connectedUser?.sexe === 'female', name: 'female' },
					]}
					onChange={(option) => dispatch<any>(updateAccountSettings({ sexe: option.name }))}
				/>
			),
		},
		{
			name: t('Default theme'),
			helperText: t('Choose your default theme'),
			control: (
				<ToggleGroup
					options={[
						{
							icon: <HiOutlineLightBulb size={20} />,
							defaultChecked: connectedUser?.defaultTheme === 'light',
							name: 'light',
						},
						{
							icon: <MdDarkMode size={20} />,
							defaultChecked: connectedUser?.defaultTheme === 'dark',
							name: 'dark',
						},
					]}
					onChange={(option) => dispatch<any>(updateAccountSettings({ defaultTheme: option.name }))}
				/>
			),
		},
		{
			name: t('Preferred language'),
			helperText: t('Choose your default app language'),
			control: (
				<ToggleGroup
					options={[
						{ text: 'FR', defaultChecked: connectedUser?.defaultLanguage === 'fr', name: 'fr' },
						{ text: 'EN', defaultChecked: connectedUser?.defaultLanguage === 'en', name: 'en' },
					]}
					onChange={(option) => dispatch<any>(updateAccountSettings({ defaultLanguage: option.name }))}
				/>
			),
		},
		{
			name: t('Preferred region'),
			helperText: t('Choose your default region (for areas to play)'),
			control: (
				<Select
					placeholder={t('Select region')}
					options={orderBy<Area>(areas?.results, ['city', 'country', 'state'], ['asc', 'desc'])}
					getOptionLabel={(option) => option?.district.join(' / ')}
					onChange={(value) => dispatch<any>(updateAccountSettings({ preferredRegion: value.districtCode }))}
					value={areas?.results?.find((area) => area.districtCode === connectedUser?.preferredRegion)}
				/>
			),
		},
		{
			name: t('Fitness level'),
			helperText: t('Set your fitness level (this is not your sport level)'),
			control: (
				<div className="flex space-x-4">
					<Chip label="Retired" />
					<Chip label="Average" />
					<Chip label="Athletic" />
					<Chip label="Very athetlic" />
				</div>
			),
		},
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
			<Dialog title={t('Change email')} open={openEmailChangeDialog} onClose={() => setOpenEmailChangeDialog(false)}>
				<EmailField label={t('Emai')} defaultValue={connectedUser?.email} />
			</Dialog>
			<Dialog
				title={t('Change phone number')}
				open={openPhoneChangeDialog}
				onClose={() => setOpenPhoneChangeDialog(false)}
			>
				<PhoneField label={t('Phone number')} defaultValue={connectedUser?.phone} />
			</Dialog>
			<div className="flex flex-col gap-y-6">
				{Settings.map(({ name, helperText, readOnly = false, control }, idx) => (
					<SettingField key={idx} settingName={name} helperText={helperText} readOnly={readOnly}>
						{control}
					</SettingField>
				))}
			</div>
		</>
	)
}

export default ProfileSettings
