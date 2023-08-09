import { AppState, Area } from 'state'
import { BottomDrawer, EditField } from 'widgets'
import { Chip, Select, TextAreaField, TextField, Toggle, ToggleGroup } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { useApi, useDevice } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'

import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdDarkMode } from 'react-icons/md'
import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'

const EditProfile = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [device] = useDevice()

	const { updateUser } = useApi()
	const areas = useSelector((state: AppState) => state.areas)
	const connectedUser = useSelector((state: AppState) => state.user)

	const {
		control,
		handleSubmit,
		formState: { isDirty, dirtyFields },
		register,
		setValue,
		reset,
	} = useForm({
		defaultValues: {
			username: connectedUser?.username,
			bio: connectedUser?.bio,
			preferredRegion: connectedUser?.preferredRegion,
		},
	})

	const Settings = [
		{
			name: t('Email'),
			control: <EditField value={connectedUser?.email} />,
		},
		{
			name: t('Phone'),
			control: <EditField value={connectedUser?.phone} />,
		},
		{
			name: t('Username'),
			readOnly: true,
			control: <TextField defaultValue={connectedUser?.username} />,
		},
		{
			name: t('Sexe'),
			control: (
				<ToggleGroup
					name="sexe"
					defaultValue={connectedUser?.sexe}
					onChange={(e) => dispatch<any>(updateUser({ sexe: e.target.value }))}
				>
					<Toggle text="Male" value="male" />
					<Toggle text="Female" value="female" />
				</ToggleGroup>
			),
		},
		{
			name: t('Default theme'),
			helperText: t('Choose your default theme'),
			control: (
				<ToggleGroup
					name="theme"
					defaultValue={connectedUser?.preferredTheme}
					onChange={(e) => dispatch<any>(updateUser({ preferredTheme: e.target.value }))}
				>
					<Toggle icon={<HiOutlineLightBulb size={20} />} value="light" />
					<Toggle icon={<MdDarkMode size={20} />} value="dark" />
				</ToggleGroup>
			),
		},
		{
			name: t('Preferred language'),
			helperText: t('Choose your default app language'),
			control: (
				<ToggleGroup
					name="locale"
					defaultValue={connectedUser?.preferredLocale}
					onChange={(e) => dispatch<any>(updateUser({ preferredLocale: e.target.value }))}
				>
					<Toggle text="FR" value="fr" />
					<Toggle text="EN" value="en" />
				</ToggleGroup>
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
					onChange={(value) => dispatch<any>(updateUser({ preferredRegion: value.districtCode }))}
					value={areas?.results?.find((area) => area.districtCode === connectedUser?.preferredRegion)}
				/>
			),
		},
		{
			name: t('Fitness level'),
			helperText: t('Set your fitness level (this is not your sport level)'),
			control: (
				<div className="flex space-x-4">
					<Chip text="Retired" />
					<Chip text="Average" />
					<Chip text="Athletic" />
					<Chip text="Very athetlic" />
				</div>
			),
		},
	]

	const MobileProfileSettings = () => (
		<div className="flex flex-col">
			<div className=""></div>
			<div></div>
			<div></div>
		</div>
	)

	const onSubmit = async (values) => {
		const keys = Object.keys(dirtyFields)
		const changes = {}

		keys.forEach((key) => (changes[key] = values[key]))

		await dispatch<any>(updateUser({ ...changes }))

		reset()
	}

	return (
		<div className="relative h-full">
			<form className="flex flex-col gap-y-4 w-[600px]" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-2xl font-semibold">{t('Edit profile')}</p>
				{!connectedUser?.isExternalAccount && <TextField label={t('Username')} fullWidth {...register('username')} />}
				<TextAreaField label={t('Bio')} fullWidth {...register('bio')} />
				<Controller
					name="preferredRegion"
					control={control}
					defaultValue={connectedUser?.preferredRegion}
					render={({ field: { value } }) => (
						<Select
							label={t('Preferred Region')}
							defaultValue={value}
							placeholder={t('Select region')}
							options={orderBy<Area>(areas?.results, ['city', 'country', 'state'], ['asc', 'desc'])}
							getOptionLabel={(option) => option?.district?.join(' / ') || ''}
							getOptionValue={(option) => option?.id || ''}
							onChange={(option) => setValue('preferredRegion', option.id, { shouldDirty: option.id !== value?.id })}
						/>
					)}
				/>

				<BottomDrawer show={isDirty} onReset={reset} />
			</form>
		</div>
	)
}

export default EditProfile
