import { Button, Dialog, DialogCTA, InputField, Select, Spinner, Switch, TextAreaField } from '@components'
import { Controller, useForm } from 'react-hook-form'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCreateGroups, useDeleteGroup, useFetchGroups, useFetchUsers } from '@hooks'

import { AppState } from '@state'
import useGroupTableColums from '../hooks/useGroupTableColums'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Groups = () => {
	const { createGroups, isLoading: isCreatingGroupsLoading } = useCreateGroups()
	const { deleteGroup, isLoading: isDeletingGroupLoading } = useDeleteGroup()
	const { isLoading: isFetchingGroupsLoading, refetch: refetchGroups } = useFetchGroups()
	const { users, isLoading: isFetchingUsers } = useFetchUsers()
	const { t } = useTranslation()
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			name: '',
			description: '',
			members: '',
			requireApproval: false,
			sport: '',
			visibility: 'public',
		},
	})

	const groups = useSelector((state: AppState) => state.groups)
	const sportOptions = useSelector((state: AppState) => state.sports?.results || [])

	const [openEditCreateGroupDialog, setOpenEditCreateGroupDialog] = useState<boolean>(false)
	const [openConfirmDeleteGroupDialog, setOpenConfirmDeleteGroupDialog] = useState<boolean>(false)
	const [openInfoGroupDialog, setOpenInfoGroupDialog] = useState<boolean>(false)
	const [selectedGroupId, setSelectedGroupId] = useState<string>('')

	const onSubmit = async (values) => {
		const data = values
		data['visibility'] = data['visibility'].value
		data['sport'] = data['sport'].id
		data['members'] = data['members'].map((m) => m.id)
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
						render={({ field }) => <InputField {...field} label={t('Group name')} fullWidth />}
					/>
					<Controller
						name="description"
						control={control}
						render={({ field }) => <TextAreaField {...field} label={t('Description')} fullWidth />}
					/>
					<Controller
						name="sport"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								label={t('Sport')}
								placeholder={t('Select sport')}
								options={sportOptions}
								getOptionLabel={(option) => option?.name}
								getOptionValue={(option) => option?.value}
								isOptionDisabled={(option) => !option?.featureAvailable}
							/>
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
								options={[
									{ key: 1, name: 'Public', value: 'public' },
									{ key: 2, name: 'Private', value: 'private' },
								]}
								getOptionLabel={(option) => option?.name}
								getOptionValue={(option) => option?.value}
							/>
						)}
					/>
					<Controller
						name="members"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								label={t('Members')}
								placeholder={isFetchingUsers ? t('Loading members...') : t('Search members')}
								options={users?.results || []}
								closeMenuOnSelect={false}
								isMulti
								getOptionLabel={(option) => option?.username}
								getOptionValue={(option) => option?.id}
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
						<Button type="submit" isLoading={isCreatingGroupsLoading}>
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
