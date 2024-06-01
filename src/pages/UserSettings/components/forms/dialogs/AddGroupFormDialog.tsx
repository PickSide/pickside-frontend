import { AppState, User } from '@state'
import { Button, DialogCTA, InputField, Select, Switch, TextAreaField } from '@components'
import { Controller, useForm, useFormState } from 'react-hook-form'

import { CreateGroupProps } from '@pages/UserSettings/utils/types'
import useCreateGroups from '@pages/UserSettings/hooks/services/useCreateGroups'
import { useFetchUsers } from '@hooks'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const AddGroupFormDialog = ({ onClose }) => {
	const { control, handleSubmit, reset } = useForm<CreateGroupProps>({
		defaultValues: {
			description: '',
			members: [],
			name: '',
			organizerId: -1,
			requireApproval: false,
			visibility: 'public',
		},
	})

	const { createGroups, isLoading: isCreatingGroupsLoading } = useCreateGroups()
	const { users, isLoading: isFetchingUsers } = useFetchUsers()
	const { dirtyFields } = useFormState({ control })
	const { t } = useTranslation()

	const me = useSelector((state: AppState) => state.user)

	const onSubmit = async (values: CreateGroupProps) => {
		const data = {
			description: values.description,
			members: values.members.map((m) => m.id),
			name: values.name,
			organizerId: me?.id,
			requiresApproval: values.requireApproval,
			visibility: values.visibility,
		}

		await createGroups(data)
		reset()
		onClose()
	}

	const visibilities = [{ value: 'public' }, { value: 'private' }]

	return (
		<form className="space-y-4 min-w-[300px]" onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="name"
				control={control}
				rules={{ required: true }}
				render={({ field }) => <InputField {...field} label={t('Group name')} placeholder={t('Name')} fullWidth />}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextAreaField {...field} label={t('Description')} placeholder={t('Describe your group')} fullWidth />
				)}
			/>
			<Controller
				name="visibility"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						label={t('Visibility')}
						placeholder={t('Select group visibility')}
						options={visibilities}
						formatOptionLabel={(option) => <span className="capitalize">{option.value}</span>}
						value={visibilities.find((x) => x.value === field.value)}
						getOptionValue={(option) => option.value}
						onChange={(selectedOption: { value: string }) => {
							field.onChange(selectedOption.value)
						}}
					/>
				)}
			/>
			<Controller
				name="members"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<Select
						{...field}
						isMulti
						closeMenuOnSelect={false}
						label={t('Members')}
						placeholder={isFetchingUsers ? t('Loading members...') : t('Search members')}
						options={users?.results.filter((user) => user.id !== me?.id) || []}
						formatOptionLabel={(option: User) => <span className="capitalize">{option?.displayName}</span>}
						getOptionLabel={(option: User) => option.displayName || ''}
						getOptionValue={(option: User) => option.id}
						menuPortalTarget={document.body}
						styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
					/>
				)}
			/>
			<Controller
				name="requireApproval"
				control={control}
				render={({ field }) => <Switch {...field} label={t('Requires approval on joining')} />}
			/>
			<DialogCTA>
				<Button variant="tertiary" onClick={onClose}>
					{t('Cancel')}
				</Button>
				<Button
					type="submit"
					disabled={!dirtyFields['name'] || !dirtyFields['members']}
					isLoading={isCreatingGroupsLoading}
				>
					{t('Create')}
				</Button>
			</DialogCTA>
		</form>
	)
}

export default AddGroupFormDialog
