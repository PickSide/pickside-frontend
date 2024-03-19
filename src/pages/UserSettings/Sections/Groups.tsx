import { AppState, User } from '@state'
import { Button, Dialog, DialogCTA, InputField, Select, Spinner, Switch, TextAreaField } from '@components'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDeleteGroup, useFetchGroups, useFetchUsers } from '@hooks'

import { CreateGroupProps } from '../utils/types'
import GroupSelector from '@components/platform/GroupSelector'
import SportSelector from '@components/platform/SportSelector'
import useCreateGroups from '../hooks/services/useCreateGroups'
import useFetchGroupByOrganizerId from '@hooks/services/useFetchGroupByOrganizerId'
import useGroupTableColums from '../hooks/useGroupTableColums'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Groups = () => {
	const { createGroups, isLoading: isCreatingGroupsLoading } = useCreateGroups()
	const { deleteGroup, isLoading: isDeletingGroupLoading } = useDeleteGroup()
	const { isLoading: isFetchingGroupsLoading, refetch: refetchGroups } = useFetchGroupByOrganizerId()
	const { users, isLoading: isFetchingUsers } = useFetchUsers()
	const { t } = useTranslation()
	const { control, handleSubmit, reset } = useForm<CreateGroupProps>({
		defaultValues: {
			description: '',
			members: [],
			name: '',
			organizerId: -1,
			requireApproval: false,
			sport: {},
			visibility: 'public',
		},
	})
	const { dirtyFields } = useFormState({ control })
	console.log(dirtyFields)

	const me = useSelector((state: AppState) => state.user)
	const groups = useSelector((state: AppState) => state.groups)
	const sportOptions = useSelector((state: AppState) => state.sports?.results || [])

	const [openEditCreateGroupDialog, setOpenEditCreateGroupDialog] = useState<boolean>(false)
	const [openConfirmDeleteGroupDialog, setOpenConfirmDeleteGroupDialog] = useState<boolean>(false)
	const [openInfoGroupDialog, setOpenInfoGroupDialog] = useState<boolean>(false)
	const [selectedGroupId, setSelectedGroupId] = useState<string>('')


	const visibilities = [
		{ value: 'public' },
		{ value: 'private' },
	]

	const onSubmit = async (values: CreateGroupProps) => {
		const data = {
			description: values.description,
			members: values.members.map(m => m.id),
			name: values.name,
			organizerId: me?.id,
			requiresApproval: values.requireApproval,
			sportId: values.sport.id,
			visibility: values.visibility
		}

		await createGroups(data)
		reset()
		refetchGroups()
		setOpenEditCreateGroupDialog(false)
	}

	const columns = useGroupTableColums({
		onClickDeleteGroup: (groupId) => {
			setOpenConfirmDeleteGroupDialog(true)
			setSelectedGroupId(groupId)
		},
	})

	const table = useReactTable({
		data: groups?.results || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<>
			<Dialog
				open={openEditCreateGroupDialog}
				onClose={() => setOpenEditCreateGroupDialog(false)}
				title={t('Create new group')}
			>
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
						render={({ field }) => <TextAreaField {...field} label={t('Description')} placeholder={t('Describe your group')} fullWidth />}
					/>
					<Controller
						name="sport"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<SportSelector {...field} />
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
								formatOptionLabel={(option) => <span className='capitalize'>{option.value}</span>}
								value={visibilities.find(x => x.value === field.value)}
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
								options={users?.results.filter(user => user.id !== me?.id) || []}
								formatOptionLabel={(option: User) => <span>{option?.username}</span>}
								getOptionLabel={(option: User) => option.username!}
								getOptionValue={(option: User) => option.id}
							/>
						)}
					/>
					<Controller
						name="requireApproval"
						control={control}
						render={({ field }) => <Switch {...field} label={t('Requires approval on joining')} />}
					/>
					<DialogCTA>
						<Button variant="tertiary" onClick={() => setOpenEditCreateGroupDialog(false)}>
							{t('Cancel')}
						</Button>
						<Button type="submit" disabled={!dirtyFields['name'] || !dirtyFields['members'] || !dirtyFields['sport']} isLoading={isCreatingGroupsLoading}>
							{t('Create')}
						</Button>
					</DialogCTA>
				</form>
			</Dialog>

			<Dialog open={openConfirmDeleteGroupDialog} onClose={() => setOpenConfirmDeleteGroupDialog(false)}>
				<p>{t('Are you sure you want to delete group ')}</p>
				<DialogCTA>
					<Button variant="tertiary" onClick={() => setOpenConfirmDeleteGroupDialog(false)}>
						{t('Cancel')}
					</Button>
					<Button
						variant="danger"
						isLoading={isDeletingGroupLoading}
						onClick={() => {
							deleteGroup(selectedGroupId)
							setOpenConfirmDeleteGroupDialog(false)
						}}
					>
						{t('Delete')}
					</Button>
				</DialogCTA>
			</Dialog>

			<Dialog open={openInfoGroupDialog} onClose={() => setOpenInfoGroupDialog(false)}></Dialog>

			<div className="p-5 w-full max-w-[1000px] overflow-y-scroll">
				<Button className="float-right mb-4" onClick={() => setOpenEditCreateGroupDialog(true)}>
					{t('Add group')}
				</Button>
				{!groups?.results?.length ? (
					t('No groups')
				) : isFetchingGroupsLoading ? (
					<Spinner text={t('Loading groups')} />
				) : (
					<table className="w-full">
						<thead className="border-b-2">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id} className="text-left text-base font-semibold">
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="h-8 border-b-2">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	)
}

export default Groups
