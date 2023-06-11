import { useState } from 'react'
import { SettingField, Switch, Select, ToggleGroup, TextField, Button, Dialog, Chip } from 'components'
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

	const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState<boolean>(false)

	const Settings = [
		{
			name: t('Username'),
			readOnly: true,
			control: <TextField defaultValue={connectedUser?.username} />,
		},
		{
			name: t('Email'),
			readOnly: false,
			control: <TextField defaultValue={connectedUser?.email} {...register('email')} />,
		},
		{
			name: t('Phone'),
			readOnly: false,
			control: <TextField defaultValue="" {...register('phone')} />,
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
			readOnly: false,
			control: (
				<ToggleGroup
					options={[
						{ text: 'Male', defaultChecked: connectedUser?.sexe === 'male', name: 'male' },
						{ text: 'Female', defaultChecked: connectedUser?.sexe === 'female', name: 'female' },
					]}
					onChange={(option) => console.log(option)}
				/>
			),
		},
		{
			name: t('Default theme'),
			helperText: t('Choose your default theme'),
			readOnly: false,
			control: (
				<ToggleGroup
					options={[
						{
							icon: <HiOutlineLightBulb size={20} />,
							defaultChecked: connectedUser?.configs?.defaultTheme === 'light',
							name: 'light',
						},
						{
							icon: <MdDarkMode size={20} />,
							defaultChecked: connectedUser?.configs?.defaultTheme === 'dark',
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
			readOnly: false,
			control: (
				<ToggleGroup
					options={[
						{ text: 'FR', defaultChecked: connectedUser?.configs?.defaultLanguage === 'fr', name: 'fr' },
						{ text: 'EN', defaultChecked: connectedUser?.configs?.defaultLanguage === 'en', name: 'en' },
					]}
					onChange={(option) => dispatch<any>(updateAccountSettings({ defaultLanguage: option.name }))}
				/>
			),
		},
		{
			name: t('Preferred region'),
			helperText: t('Choose your default region (for areas to play)'),
			readOnly: false,
			control: (
				<Select
					placeholder={t('Select region')}
					options={orderBy<Area>(areas?.results, ['city', 'country', 'state'], ['asc', 'desc'])}
					getOptionLabel={(option) => option?.district.join(' / ')}
					onChange={(value) => dispatch<any>(updateAccountSettings({ preferredRegion: value.districtCode }))}
					value={areas?.results?.find((area) => area.districtCode === connectedUser?.configs?.preferredRegion)}
				/>
			),
		},
		{
			name: t('Fitness level'),
			helperText: t('Set your fitness level (this is not your sport level)'),
			readOnly: false,
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
			readOnly: false,
			control: (
				<Switch
					defaultChecked={connectedUser?.configs?.hideAge}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hideAge: e.target.checked }))}
				/>
			),
		},
		{
			name: t('Hide email'),
			helperText: t('Hide your email from other users'),
			readOnly: false,
			control: (
				<Switch
					defaultChecked={connectedUser?.configs?.hideEmail}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hideEmail: e.target.checked }))}
				/>
			),
		},
		{
			name: t('Hide phone'),
			helperText: t('Hide your phone from other users'),
			readOnly: false,
			control: (
				<Switch
					defaultChecked={connectedUser?.configs?.hidePhone}
					onChange={(e) => dispatch<any>(updateAccountSettings({ hidePhone: e.target.checked }))}
				/>
			),
		},
		{
			name: t('Hide username'),
			helperText: t('Hide your username from other users'),
			readOnly: false,
			control: (
				<Switch
					defaultChecked={connectedUser?.configs?.hideUsername}
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
			<div className="flex flex-col gap-y-6">
				{Settings.map(({ name, helperText, readOnly, control }, idx) => (
					<SettingField key={idx} settingName={name} helperText={helperText} readOnly={readOnly}>
						{control}
					</SettingField>
				))}
			</div>
		</>
	)
}

export default ProfileSettings
